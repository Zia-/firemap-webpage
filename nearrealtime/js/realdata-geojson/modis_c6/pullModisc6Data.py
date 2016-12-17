import os, time, csv, json

modisc6GlobalUrl = "https://firms.modaps.eosdis.nasa.gov/active_fire/c6/text/MODIS_C6_Global_24h.csv"
basePath = '/var/www/html/maps/realdata-geojson/modis_c6/'
baseFileName = 'MODIS_C6_Global_24h'

def createElemGeojson(latitude,longitude,brightness,scan,track,acq_date,acq_time,satellite,confidence,version,bright_t31,frp,daynight):
    propValue = {}
    propValue['BRIGHTNESS'] = float(brightness)
    propValue['SCAN'] = float(scan)
    propValue['TRACK'] = float(track)
    propValue['ACQUISITION_DATE'] = acq_date
    propValue['ACQUISITION_TIME'] = int(acq_time)
    propValue['SATELLITE'] = satellite
    propValue['CONFIDENCE'] = confidence
    propValue['VERSION'] = version
    propValue['BRIGHTNESS_TEMPERATURE_CHANNEL31'] = float(bright_t31)
    propValue['FIRE_RADIATIVE_POWER'] = float(frp)
    propValue['DAYNIGHT'] = daynight
    geomValue = {}
    geomValue['type'] = "Point"
    coord = list()
    coord.append(float(longitude))
    coord.append(float(latitude))
    geomValue['coordinates'] = coord 
    geojsonElemData = {}
    geojsonElemData['type'] = "Feature"
    geojsonElemData['properties'] = propValue
    geojsonElemData['geometry'] = geomValue
    return geojsonElemData

def genGeojson():
    geojsonData = {}
    geojsonData['type'] = "FeatureCollection"
    crsPropValue = {}
    crsPropValue['name'] = "urn:ogc:def:crs:OGC:1.3:CRS84"
    crsValue = {}
    crsValue['type'] = "name"
    crsValue['properties'] = crsPropValue
    geojsonData['crs'] = crsValue
    dataList = list()

    with open(basePath + baseFileName + ".csv", 'rb') as data_csv:
	rows = csv.reader(data_csv, delimiter = ',')
	for row in rows:
	    if (row[0] == "latitude" and row[1] == "longitude"):
		# Ignore first row, which is attributes name.
		pass;
	    else:
		if ((32.774850 <= float(row[0]) <= 44.900607) and (20.551105 <= float(row[1]) <= 49.930658)):
		    dataList.append(createElemGeojson(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12]))
    
    geojsonData['features'] = dataList
    json.dump(geojsonData, open(basePath + baseFileName + "_turkeyFiltered.geojson", 'wb'))    

def process():
    os.system("wget " + modisc6GlobalUrl  + " -P " + basePath)
    genGeojson()    

def main():
    if (os.path.isfile(basePath + baseFileName + ".csv")):
        os.remove(basePath + baseFileName + ".csv")
        process()
    else:
        process()

main()
