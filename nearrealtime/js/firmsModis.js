// Load modis c6 data --------------------------------------------
var firmsModisc6Realurl = "https://raw.githubusercontent.com/Zia-/Rubbish/master/MODIS_C6_Global_24h_turkeyFiltered.geojson"

// Create modis c6 featureLayer
var firmsModisc6FeatureLayer = L.mapbox.featureLayer(firmsModisc6Realurl, {
    pointToLayer: function(feature, latlng) {
        var lng = latlng['lng']
        var lat = latlng['lat']
        return L.polygon([L.latLng(lat,lng-0.02548), L.latLng(lat+0.02548,lng), L.latLng(lat,lng+0.02548), L.latLng(lat-0.02548,lng), L.latLng(lat,lng-0.02548)]);
    },
    style: function (feature) {
      var rgb = '#58ACFA'
      return {color: rgb, weight: 1, opacity: 1};
    },
})
  .on('ready', featureLayerModisc6PopupBind)

// Bind popup to modis c6 layer features
function featureLayerModisc6PopupBind() {
  firmsModisc6FeatureLayer.eachLayer(function(layer) {
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
          '   <td>Brightness</td>'+
          '   <td>' + layer.feature.properties.BRIGHTNESS + ' K</td>'+
        '  </tr>'+
        '  <tr class = "active">'+
        '     <td>Brightness T Ch31</td>'+
          '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_CHANNEL31 + ' K</td>'+
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

// Below will be handled by modis c6 click buttons
var firmsModisc6ToggleVar = 0;
var firmsModisc6Timer;
function firmsModisc6() {
  if (firmsModisc6ToggleVar == 0){
    // Load modis c6 data
    firmsModisc6FeatureLayer.addTo(map);
    // Start timer
    firmsModisc6Timer = setInterval(function(){firmsModisc6FeatureLayer.loadURL(firmsModisc6Realurl);}, 300000);
    // Change toggler value
    firmsModisc6ToggleVar = 1;
  } else {
    // Unload modis c6 data
    map.removeLayer(firmsModisc6FeatureLayer);
    // Stop timer
    clearInterval(firmsModisc6Timer);
    // Change toggler value
    firmsModisc6ToggleVar = 0;
  }
}
