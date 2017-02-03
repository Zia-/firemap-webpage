// Load frp pixel seviri data ---------------------------------------------
// var frpPixelSeviriRealurl = "https://raw.githubusercontent.com/Zia-/Rubbish/master/HDF5_LSASAF_MSG_FRP-PIXEL-ListProduct_MSG-Disk_turkeyFiltered.geojson"
var frpPixelSeviriRealurl = "js/realdata-geojson/seviri_lsa/HDF5_LSASAF_MSG_FRP-PIXEL-ListProduct_MSG-Disk_turkeyFiltered.geojson"

// Create frp pixel seviri featureLayer
var frpPixelSeviriFeatureLayer = L.mapbox.featureLayer(frpPixelSeviriRealurl, {
    pointToLayer: function(feature, latlng) {
        var lng = latlng['lng']
        var lat = latlng['lat']
        return L.polygon([L.latLng(lat,lng-0.02548), L.latLng(lat+0.02548,lng), L.latLng(lat,lng+0.02548), L.latLng(lat-0.02548,lng), L.latLng(lat,lng-0.02548)]);
    },
    style: function (feature) {
      var rgb = '#00FF00'
      return {color: rgb, weight: 1, opacity: 1};
    },
})
  .on('ready', featureLayerFrpPixelSeviriPopupBind)

// Bind popup to frp pixel seviri layer features
function featureLayerFrpPixelSeviriPopupBind() {
  frpPixelSeviriFeatureLayer.eachLayer(function(layer) {
    var popup = new L.Popup({ autoPan: false });
    var baseUrl = "https://maps.google.com/?q=";
    var googleMapsUrl = baseUrl.concat(layer.feature.geometry.coordinates[1],
                                      ",",layer.feature.geometry.coordinates[0],
                                      "&ll=",layer.feature.geometry.coordinates[1],
                                      ",",layer.feature.geometry.coordinates[0],
                                      "&z=10");
    popup.setContent(
      '<div class="table-responsive">    '+
          '<table class = "table">'+
       '<caption><h1><strong>Fire Radiative Power:</strong> ' + Math.round(layer.feature.properties.FIRE_RADIATIVE_POWER) + ' MW</h1></caption>'+
       '<tbody>'+
        '  <tr class = "danger">'+
            ' <td><button type="button" class="btn-danger" onclick="window.open(\'' + googleMapsUrl + '\')">Location</button></td>'+
            ' <td>Lat: ' + layer.feature.geometry.coordinates[1] + ', Lon: ' + layer.feature.geometry.coordinates[0] + '</td>'+
        '  </tr>'+
        '  <tr class = "success">'+
        '     <td>Pixel Size</td>'+
          '   <td>' + layer.feature.properties.PIXEL_SIZE + '</td>'+
        '  </tr>'+
        '  <tr class = "warning">'+
          '   <td>Time</td>'+
          '   <td>' + layer.feature.properties.ACQUISITION_TIME + '</td>'+
          '</tr>'+
          '<tr>'+
          '   <td>Brightness T MIR</td>'+
          '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_MIR + ' K</td>'+
        '  </tr>'+
        '  <tr class = "active">'+
        '     <td>Brightness T TIR</td>'+
          '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_TIR + ' K</td>'+
        '  </tr>'+
        '  <tr class = "active">'+
        '     <td>Fire Confidence</td>'+
          '   <td>' + layer.feature.properties.FIRE_CONFIDENCE + '</td>'+
        '  </tr>'+
       '</tbody>'+
      '</table>'+
      '</div>'
    )
    layer.bindPopup(popup);
  });
}

// Below will be handled by frpPixelSeviri click buttons
var frpPixelSeviriToggleVar = 0;
var frpPixelSeviriTimer;
function frpPixelSeviri() {
  if (frpPixelSeviriToggleVar == 0){
    // Load frp pixel seviri data
    frpPixelSeviriFeatureLayer.addTo(map);
    // Start timer
    frpPixelSeviriTimer = setInterval(function(){frpPixelSeviriFeatureLayer.loadURL(frpPixelSeviriRealurl);}, 300000);
    // Change toggler value
    frpPixelSeviriToggleVar = 1;
  } else {
    // Unload frp pixel seviri data
    map.removeLayer(frpPixelSeviriFeatureLayer);
    // Stop timer
    clearInterval(frpPixelSeviriTimer);
    // Change toggler value
    frpPixelSeviriToggleVar = 0;
  }
}
