// Load viirs data --------------------------------------------
var firmsViirsRealurl = "https://raw.githubusercontent.com/Zia-/Rubbish/master/VNP14IMGTDL_NRT_Global_24h_turkeyFiltered.geojson"

// Create viirs featureLayer
var firmsViirsFeatureLayer = L.mapbox.featureLayer(firmsViirsRealurl, {
    pointToLayer: function(feature, latlng) {
        var lng = latlng['lng']
        var lat = latlng['lat']
        return L.polygon([L.latLng(lat,lng-0.02548), L.latLng(lat+0.02548,lng), L.latLng(lat,lng+0.02548), L.latLng(lat-0.02548,lng), L.latLng(lat,lng-0.02548)]);
    },
    style: function (feature) {
      var rgb = '#FF0000'
      return {color: rgb, weight: 1, opacity: 1};
    },
})
  .on('ready', featureLayerFirmsViirsPopupBind)

// Bind popup to viirs layer features
function featureLayerFirmsViirsPopupBind() {
  firmsViirsFeatureLayer.eachLayer(function(layer) {
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
        '  <tr class = "warning">'+
          '   <td>Time</td>'+
          '   <td>' + layer.feature.properties.ACQUISITION_TIME + '</td>'+
          '</tr>'+
          '<tr>'+
          '   <td>Brightness T Ch5</td>'+
          '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_CHANNEL5 + ' K</td>'+
        '  </tr>'+
        '  <tr class = "active">'+
        '     <td>Brightness T Ch4</td>'+
          '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_CHANNEL4 + ' K</td>'+
        '  </tr>'+
        '  <tr class = "active">'+
        '     <td>Date</td>'+
          '   <td>' + layer.feature.properties.ACQUISITION_DATE + '</td>'+
        '  </tr>'+
        '  <tr class = "active">'+
        '     <td>Day / Night</td>'+
          '   <td>' + layer.feature.properties.DAYNIGHT + '</td>'+
        '  </tr>'+
       '</tbody>'+
      '</table>'+
      '</div>'
    )
    layer.bindPopup(popup);
  });
}

// Below will be handled by viirs click buttons
var firmsViirsToggleVar = 0;
var firmsViirsTimer;
function firmsViirs() {
  if (firmsViirsToggleVar == 0){
    // Load viirs data
    firmsViirsFeatureLayer.addTo(map);
    // Start timer
    firmsViirsTimer = setInterval(function(){firmsViirsFeatureLayer.loadURL(firmsViirsRealurl);}, 300000);
    // Change toggler value
    firmsViirsToggleVar = 1;
  } else {
    // Unload viirs data
    map.removeLayer(firmsViirsFeatureLayer);
    // Stop timer
    clearInterval(firmsViirsTimer);
    // Change toggler value
    firmsViirsToggleVar = 0;
  }
}
