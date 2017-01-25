from ftplib import FTP
import datetime, os, h5py, json
import matplotlib.pyplot as plt
import numpy as np

ftpUrl = 'safmil.ipma.pt'
user = 'rggb'
passwd = 'rgTuBgb8'
basePath = '/itu/users/geoitweb/fires.itu.edu.tr/public_html/nearrealtime/js/realdata-geojson/seviri_lsa/'
baseFileName = 'HDF5_LSASAF_MSG_FRP-PIXEL-ListProduct_MSG-Disk'
ftpBasePath = '/OperationalChain/LSASAF_Products/FRP-PIXEL/'

def getLatestDataURL(ftpUrl, user, passwd, frp_pixel_dir):
    ftp = FTP(ftpUrl)
    ftp.login(user, passwd)
    ftp.cwd(frp_pixel_dir)
    ftpList = ftp.nlst()
    ftp.quit()
    dateTimeList = list()
    for i in range(0,len(ftpList)):
        dateTimeList.append(datetime.datetime(int(ftpList[i][-16:-12]), int(ftpList[i][-12:-10]), int(ftpList[i][-10:-8]), int(ftpList[i][-8:-6]), int(ftpList[i][-6:-4])))
    dateTimeList.sort()
    dateTimeString = [str(dateTimeList[-1].year).zfill(4),str(dateTimeList[-1].month).zfill(2),str(dateTimeList[-1].day).zfill(2),str(dateTimeList[-1].hour).zfill(2),str(dateTimeList[-1].minute).zfill(2)]
    seviriLsaFTPUrl = "ftp://" + user + ":" + passwd + "@" + ftpUrl + ftpBasePath + baseFileName + "_" + ''.join(dateTimeString) + ".bz2"
    return seviriLsaFTPUrl

def h5py2Dic(unzipFilePath):
    h5pyFile = h5py.File(unzipFilePath,'r')
    h5pyKeys = h5pyFile.keys()
    dataArrayRaw = {}
    for index, key in enumerate(h5pyKeys[:]):
        dataArrayRaw[str(key)] = np.array(h5pyFile[key])
    return dataArrayRaw

def createElemGeojson(acqtime,fire_confidence,bt_mir,bt_tir,pixel_size,frp,longitude,latitude):
    propValue = {}
    propValue['ACQUISITION_TIME'] = int(acqtime)
    # We need to divide by 100, 10 etc for scaling factor. It was given in Seviri documentation
    propValue['FIRE_CONFIDENCE'] = float(fire_confidence/100.0)
    propValue['BRIGHTNESS_TEMPERATURE_MIR'] = float(bt_mir/10.0)
    propValue['BRIGHTNESS_TEMPERATURE_TIR'] = float(bt_tir/10.0)
    propValue['PIXEL_SIZE'] = float(pixel_size/100.0)
    propValue['FIRE_RADIATIVE_POWER'] = float(frp/10.0)
    geomValue = {}
    geomValue['type'] = "Point"
    coord = list()
    coord.append(float(longitude/100.0))
    coord.append(float(latitude/100.0))
    geomValue['coordinates'] = coord
    geojsonElemData = {}
    geojsonElemData['type'] = "Feature"
    geojsonElemData['properties'] = propValue
    geojsonElemData['geometry'] = geomValue
    return geojsonElemData

def genGeojson(unzipFilePath):
    geojsonData = {}
    geojsonData['type'] = "FeatureCollection"
    crsPropValue = {}
    crsPropValue['name'] = "urn:ogc:def:crs:OGC:1.3:CRS84"
    crsValue = {}
    crsValue['type'] = "name"
    crsValue['properties'] = crsPropValue
    geojsonData['crs'] = crsValue
    dataList = list()

    dataArrayRaw = h5py2Dic(unzipFilePath)

    numElems = len(dataArrayRaw.values()[0])
    for i in range(0,numElems):
	if ((32.774850 <= float(dataArrayRaw['LATITUDE'][i]/100.0) <= 44.900607) and (20.551105 <= float(dataArrayRaw['LONGITUDE'][i]/100.0) <= 49.930658)):
	    dataList.append(createElemGeojson(dataArrayRaw['ACQTIME'][i],dataArrayRaw['FIRE_CONFIDENCE'][i],dataArrayRaw['BT_MIR'][i],dataArrayRaw['BT_TIR'][i],dataArrayRaw['PIXEL_SIZE'][i],dataArrayRaw['FRP'][i],dataArrayRaw['LONGITUDE'][i],dataArrayRaw['LATITUDE'][i]))
	else:
	    # Do nothing as the point is out of our region of interest
	    pass;

    geojsonData['features'] = dataList
    json.dump(geojsonData, open(basePath + baseFileName + "_turkeyFiltered.geojson", 'wb'))

def process():
    os.system("wget " + getLatestDataURL(ftpUrl, user, passwd, '/home/rggb' + ftpBasePath) + " -O " + basePath + baseFileName + ".bz2")
    os.system("bzip2 -d " + basePath + baseFileName + ".bz2")
    genGeojson(basePath + baseFileName)

def main():
    if (os.path.isfile(basePath + baseFileName + ".bz2") or os.path.isfile(basePath + baseFileName)):
        try:
            os.remove(basePath + baseFileName + ".bz2")
        except OSError:
            pass
        try:
            os.remove(basePath + baseFileName)
        except OSError:
            pass
        process()
    else:
        process()

main()
