// Fix mapbox token
L.mapbox.accessToken = 'pk.eyJ1IjoiemlhLW0iLCJhIjoiQjM5aVpfTSJ9.s_U7YxQCK-Zq5SaJemH5bA';
// 35.570652, 24.884267, 42.425880, 45.252919 Turkey bounds
// 40.903699, 28.697378  41.177273, 29.276363 Istanbul bounds which was used to download osm data
// Construct a bounding box for this map that the user cannot move out of
var minlatbound = 32.774850, minlonbound = 20.551105, maxlatbound = 44.900607, maxlonbound = 49.930658;
// var minlatbound = -6.983754, minlonbound = 38.982368, maxlatbound = -6.574648, maxlonbound = 39.500786;
var southWestbound = L.latLng(minlatbound, minlonbound),
    northEastbound = L.latLng(maxlatbound, maxlonbound),
    bounds = L.latLngBounds(southWestbound, northEastbound);

// Initialize the map
var map = L.mapbox.map('map', null, {
          maxBounds: bounds,
          maxZoom: 19,
          minZoom: 1
});
map.fitBounds(bounds);
// Code from here https://github.com/Leaflet/Leaflet.heat/blob/gh-pages/demo/index.html
// firedata = firedata.map(function (p) { return [p[2], p[3]]; });
// var heat = L.heatLayer(firedata);
// heat.addTo(map);

// Define an icon called cssIcon
// var cssIcon = L.divIcon({
//   // Specify a class name we can refer to in CSS.
//   className: 'css-icon',
//   // Set marker width and height
//   iconSize: [60, 60]
// });
//
// // Create three markers and set their icons to cssIcon
// L.marker([36, 32], {icon: cssIcon}).addTo(map);

// console.log(firedata.length);


// pointToLayer: function(feature, latlng) {
//         return L.circleMarker(latlng, {
//             radius: (feature.properties.population)/200000
//         })
//     },
//     style: function (feature) {
//     return {color: color_rgb_gen_redgreen( 78550, 14657434, feature.properties.population)};
//     	},
//     	onEachFeature: function (feature, layer) {
//     layer.bindPopup(feature.properties.population);
//     	}


//////////////////////////////////////////////////////////////////////////////////////////////
// On real server it will be like var realurl = "../realdata-geojson/realfire0.geojson";
// var realurl = "http://maps.itu.edu.tr/maps/firemap/realdata-geojson/viirs/VNP14IMGTDL_NRT_Global_24h_turkeyFiltered.geojson"
// var realurl = "http://78.46.112.41/test/VNP14IMGTDL_NRT_Global_24h_turkeyFiltered.geojson"
// var realurl = "https://raw.githubusercontent.com/Zia-/Zia-.github.io/master/firemap_data/VNP14IMGTDL_NRT_Global_24h_turkeyFiltered.geojson";
////////////// To have a static url just delete the following section, and update above url accordingly
// var tester = 0;
// function mytester() {
//   switch (tester){
//     case 0:
//       realurl = "https://raw.githubusercontent.com/Zia-/Zia-.github.io/master/firemap_data/realfire1.geojson";
//       tester = 1;
//       break;
//     case 1:
//       realurl = "https://raw.githubusercontent.com/Zia-/Zia-.github.io/master/firemap_data/realfire2.geojson";
//       tester = 2;
//       break;
//     case 2:
//       realurl = "https://raw.githubusercontent.com/Zia-/Zia-.github.io/master/firemap_data/realfire0.geojson";
//       tester = 0;
//       break;
//   }
// };
// var geojsontester = setInterval(mytester, 10000);
//////////////////////////////////////////////////////////////////////////////////////////////


// Function to alter danger button height based on json feature count
// function dangerTop(featCount) {
//   if (featCount == 0) {
//     $("danger").css("top", "-100px");
//   } else {
//     $(".danger").css("top", "15px");
//   }
// }
//

// Check if dangerSiren should be active or not on page load
// $.getJSON( realurl, function( json ) {if (json.features.length == 0) {$(".dangerSiren").css("top", "-100px");} else {$(".dangerSiren").css("top", "15px");}});



// // var realurl = "https://raw.githubusercontent.com/Zia-/Zia-.github.io/master/firemap_data/realfire2.geojson";
// var featureLayer = L.mapbox.featureLayer(realurl, {
//     // pointToLayer: L.mapbox.marker.style,
//     pointToLayer: function(feature, latlng) {
//       // return L.circle([39.252220,-6.813335], 200)
//     //   return L.polygon([[39.160210,-6.858332],[39.213768,-6.830380],[39.156776,-6.801745],[39.160210,-6.858332]], {color: 'red', opacity: 1, weight: 0})
//         // return L.circleMarker(latlng, {
//         //     radius: (feature.properties.previous_dominating_activity_confidence)/10
//         //     // radius: 20
//         //     // icon: L.polygon([[39.252220,-6.813335],[39.272220,-6.873335],[39.232220,-6.833335],[39.252220,-6.813335]], {color: 'red', opacity: 1, weight: 0})
//         // })
//         // console.log(latlng);
//         var lng = latlng['lng']
//         var lat = latlng['lat']
//         // console.log(lon);
//         // var lonmin = lon-0.02548
//         return L.polygon([L.latLng(lat,lng-0.02548), L.latLng(lat+0.02548,lng), L.latLng(lat,lng+0.02548), L.latLng(lat-0.02548,lng), L.latLng(lat,lng-0.02548)]);
//     },
//     style: function (feature) {
//       // Change color according to FRP value
//       // var rgb = '';
//       // var frp_value = feature.properties.FIRE_RADIATIVE_POWER
//       // if (frp_value <= 30){rgb += '#0000FF'}
//       // else if (frp_value > 30 && frp_value <= 40){rgb += '#00BFFF'}
//       // else if (frp_value > 40 && frp_value <= 60){rgb += '#00FF80'}
//       // else if (frp_value > 60 && frp_value <= 80){rgb += '#40FF00'}
//       // else if (frp_value > 80 && frp_value <= 120){rgb += '#FFFF00'}
//       // else if (frp_value > 120){rgb += '#FF4000'}
//       var rgb = '#FF0000'
//       return {color: rgb, weight: 1, opacity: 1};
//     },
//     // popupOptions: function (feature) {
//     //   var popup = L.popup()
//     //               .setContent('<p>Hello world!<br />This is a nice popup.</p>')
//     //   return {maxWidth: 100}
//     // }
//     // onEachFeature: function (feature, layer) {
//     //   layer.bindPopup('aaa');
//     //   // console.log("aaaasdasd");
//   	// }
//     // onEachFeature: onEachFeature
// })
//     // .loadURL('')
//     // Once this layer loads, we set a timer to load it again in a few seconds.
//     .on('ready', run)
//     // .bindPopup('Hello world!')
//     // .setStyle()
//   //   .on('click', function(feature)
//   //   {
//   //     // console.log("aaa");
//   //
//   //       if (!feature.data) return;
//   //       var popup = L.popup()
//   //           .setLatLng(feature.latLng)
//   //           .setContent(feature.properties.previous_dominating_activity_confidence)
//   //           .openOn(map);
//   //   }
//   // )
//     .addTo(map);
//
// function run() {
//     // map.featureLayer.eachLayer(function(marker) {
//     //     // You can replace this test for anything else, to choose the right
//     //     // marker on which to open a popup. by default, popups are exclusive
//     //     // so opening a new one will close all of the others.
//     //     // if (marker.feature.properties.title === 'Capital Pride Parade') {
//     //     console.log("hhhh");
//     //     // marker.openPopup();
//     //     // }
//     // });
//     featureLayer.eachLayer(function(layer) {
//       // console.log(layer.feature.properties.accuracy);
//
//       var popup = new L.Popup({ autoPan: false });
//       // popup.setContent('<div>' + layer.feature.properties.JDAY + '</div>' +
//       //     layer.feature.properties.F_CONF + ' people per square mile');
//       // var lat = layer.feature.geometry.coordinates[1];
//       // var lon = layer.feature.geometry.coordinates[0];
//       // // var baseUrl = 'http://maps.google.com/maps?&z=8&q=';
//       // // var plus = '+';
//       // // var googleMapsUrl = string.concat(baseUrl, lat, plus, lon);
//       //
//       // var lat = '39';
//       // var lon = '42';
//       // // var googleMapsUrl = 'http://maps.google.com/maps?&z=8&q=' + lat '+' + lon '/'
//       // var googleMapsUrl = 'http://maps.google.com/maps?&z=10&q=42+36.1231231'
//
//
//       // var baseUrl = "https://maps.google.com/?q=38.6531004,-90.243462&ll=38.6531004,-90.243462&z=3";
//       var baseUrl = "https://maps.google.com/?q=";
//       // var lat = layer.feature.geometry.coordinates[1];
//       // var plus = "+";
//       // var lon = layer.feature.geometry.coordinates[0];
//       var googleMapsUrl = baseUrl.concat(layer.feature.geometry.coordinates[1],
//                                         ",",layer.feature.geometry.coordinates[0],
//                                         "&ll=",layer.feature.geometry.coordinates[1],
//                                         ",",layer.feature.geometry.coordinates[0],
//                                         "&z=10");
//
//
//
//
//       popup.setContent(
//         // '<div class="container">'+
//         '<div class="table-responsive">    '+
//       '<table class = "table">'+
//    '<caption><h1><strong>Fire Radiative Power:</strong> ' + Math.round(layer.feature.properties.FIRE_RADIATIVE_POWER) + ' MW</h1></caption>'+
//   //  '<thead>'+
//   //     '<tr>'+
//   //        '<th>Product</th>'+
//   //        '<th>Payment Date</th>'+
//   //       // ' <th>Status</th>'+
//   //     '</tr>'+
//   //  '</thead>'+
//
// // <A HREF="http://maps.google.com/maps?&z=10&q=36.26577+-92.54324"> LINK TO GOOGLE MAP</a>
//
//
//    '<tbody>'+
//     '  <tr class = "danger">'+ // active success warning danger
//       // '   <td>Location</td>'+
//         // ' <td><button type="button" class="btn-danger"><a href="http://maps.itu.edu.tr/maps/firemap-webpage/firemap-archieve/" target="_blank" class="btn btn-common">Location</a></button></td>'+
//         ' <td><button type="button" class="btn-danger" onclick="window.open(\'' + googleMapsUrl + '\')">Location</button></td>'+
//
//         // ' <td><button type="button" class="btn-danger"><input type="button" onclick="window.open(\'http://www.example.com\',\'_blank\',\'resizable=yes\')" /></button></td>'+
//         ' <td>Lat: ' + layer.feature.geometry.coordinates[1] + ', Lon: ' + layer.feature.geometry.coordinates[0] + '</td>'+
//         // ' <td>Pending</td>'+
//     '  </tr>'+
//
//
//
//
//
//
//
//
//     '  <tr class = "warning">'+
//       '   <td>Time</td>'+
//       // '   <td><span class="label label-warning">Time</span></td>'+
//       '   <td>' + layer.feature.properties.ACQUISITION_TIME + '</td>'+
//       // '   <td>Delivered</td>'+
//       '</tr>'+
//       // '<tr class = "success">'+
//       '<tr>'+
//       '   <td>Brightness T Ch5</td>'+
//       // '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_CHANNEL5 + ' km<sup>2</sup></td>'+
//       '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_CHANNEL5 + ' K</td>'+
//       // '   <td>In Call to confirm</td>'+
//     '  </tr>'+
//     '  <tr class = "active">'+
//     '     <td>Brightness T Ch4</td>'+
//       '   <td>' + layer.feature.properties.BRIGHTNESS_TEMPERATURE_CHANNEL4 + ' K</td>'+
//       // '   <td>Declined</td>'+
//     '  </tr>'+
//     '  <tr class = "active">'+
//     '     <td>Date</td>'+
//       '   <td>' + layer.feature.properties.ACQUISITION_DATE + '</td>'+
//       // '   <td>Declined</td>'+
//     '  </tr>'+
//     // '  </tr>'+
//     '  <tr class = "active">'+
//     '     <td>Day / Night</td>'+
//       '   <td>' + layer.feature.properties.DAYNIGHT + '</td>'+
//       // '   <td>Declined</td>'+
//     '  </tr>'+
//     // '  </tr>'+
//     // '  <tr class = "active">'+
//     // '     <td>Brightness TIR Temp.</td>'+
//     //   '   <td>' + layer.feature.properties.BT_TIR + ' K</td>'+
//     // '  </tr>'+
//     // '  <tr class = "active">'+
//     // '     <td>Brightness TIR Temp.</td>'+
//     //   '   <td>' + layer.feature.properties.BW_BT_MIR + '</td>'+
//     //   // '   <td>Declined</td>'+
//     // '  </tr>'+
//     // '  <tr class = "active">'+
//     // '     <td>Julian Day</td>'+
//     //   '   <td>' + layer.feature.properties.JDAY + '</td>'+
//     // '  </tr>'+
//    '</tbody>'+
// '</table>'+
// // '  </div>'+
// '</div>'
// )
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//       layer.bindPopup(popup);
//       // var str = layer.feature.properties.accuracy
//       // layer.bindPopup(String(str));
//         // map.panTo(l.getLatLng());
//         // var popup = L.popup()
//         //     .setLatLng(l.latLng)
//         //     .setContent(l.color)
//         //     .openOn(map);
//     });
//     window.setTimeout(function() {
//
//         // $(".led-green").toggle(function(){
//         //
//         //   $(this).css('background-color','#190707')
//         // }, function(){
//         //   $(this).css('background-color','#0101DF')
//         // })
//
//
//
//         // $(".led-green").css('background-color','#3104B4');
//         // console.log("hi");
//         featureLayer.loadURL(realurl);
//         // Check if dangerSiren should be active or not on url load
//         $.getJSON( realurl, function( json ) {if (json.features.length == 0) {$(".dangerSiren").css("top", "-100px");} else {$(".dangerSiren").css("top", "15px");}});
//     }, 300000); // If want to change the timer then change geojsontester timers also for proper sync.
// }
//
// var testerVar = 0;
// function myTimer() {
//   if (testerVar == 0){
//     $(".led-green").css('background-color','transparent');
//     // $(".led-green").animate({'background-color', '#D3E1FA'}, 'slow');
//     testerVar = 1;
//   } else {
//     $(".led-green").css('background-color','#55FF00');
//     // $(".led-green").animate({'background-color', '#F4F4F4'}, 'slow');
//     testerVar = 0;
//   }
// };
// var sirenTimer = setInterval(myTimer, 500);




// function explode(){
//   alert("Boom!");
// }
// setTimeout(explode, 2000);

// window.setTimeout(function() {
//
//       $(".led-green").toggle(function(){
//
//         $(this).css('background-color','#55FF00')
//       }, function(){
//         $(this).css('background-color','#FF0000')
//       })
//
//
//
//     // $(".led-green").css('background-color','#3104B4');
//     // console.log("hi");
// }, 1000);



// function onEachFeature(feature, layer) {
//       layer.on({
//           mousemove: console.log("mousemove"),
//           mouseout: console.log("mouseout"),
//           click: console.log("click")
//       });
//   };






// for (i=0; i<firedata.length; ++i){
//   // console.log(firedata[i][2]);
//   // console.log(firedata[i][3]);
//   // xmin = firedata[i][2]-0.02548;
//   // xmax = firedata[i][2]+0.02548;
//   // ymin = firedata[i][3]-0.02548;
//   // ymax = firedata[i][3]+0.02548;
//   array = []
//   arr = [firedata[i][2]-0.02548, firedata[i][3]]
//   array.push(arr);
//   arr = [firedata[i][2], firedata[i][3]+0.02548]
//   array.push(arr);
//   arr = [firedata[i][2]+0.02548, firedata[i][3]]
//   array.push(arr);
//   arr = [firedata[i][2], firedata[i][3]-0.02548]
//   array.push(arr);
//   arr = [firedata[i][2]-0.02548, firedata[i][3]]
//   array.push(arr);
//   // 30, 40, 60, 80, 120 green,
//   rgb = '';
//   if (firedata[i][5] <= 30){rgb += '#0000FF'}
//   else if (firedata[i][5] > 30 && firedata[i][5] <= 40){rgb += '#00BFFF'}
//   else if (firedata[i][5] > 40 && firedata[i][5] <= 60){rgb += '#00FF80'}
//   else if (firedata[i][5] > 60 && firedata[i][5] <= 80){rgb += '#40FF00'}
//   else if (firedata[i][5] > 80 && firedata[i][5] <= 120){rgb += '#FFFF00'}
//   else if (firedata[i][5] > 120){rgb += '#FF4000'}
//   L.polygon(array, {color: rgb, opacity: 1, weight: 0}).addTo(map);
// }

// for (i = 0; i < 1000; ++i){
//   array = []
//   arr = [36+i/100, 32+i/100]
//   array.push(arr);
//   arr = [36.1+i/100, 32.1+i/100]
//   array.push(arr);
//   arr = [36.2+i/100, 32.2+i/100]
//   array.push(arr);
//   arr = [36+i/100, 32+i/100]
//   array.push(arr);
//   L.polygon(array, {color: 'red'}).addTo(map);
// };
// L.polygon([[36, 32],[37,32],[38,33],[36,32]], {color: 'red'}).addTo(map);

// Other mapbox layers https://www.mapbox.com/api-documentation/#maps
var layers = {
      Dark: L.mapbox.tileLayer('mapbox.dark'),
      Streets: L.mapbox.tileLayer('mapbox.streets'),
      Light: L.mapbox.tileLayer('mapbox.light'),
      Satellite: L.mapbox.tileLayer('mapbox.satellite'),
      StreetsSatellite: L.mapbox.tileLayer('mapbox.streets-satellite'),
      Wheatpaste: L.mapbox.tileLayer('mapbox.wheatpaste'),
      StreetsBasic: L.mapbox.tileLayer('mapbox.streets-basic'),
      Comic: L.mapbox.tileLayer('mapbox.comic'),
      Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
      RunBikeHike: L.mapbox.tileLayer('mapbox.run-bike-hike'),
      Pencil: L.mapbox.tileLayer('mapbox.pencil'),
      Pirates: L.mapbox.tileLayer('mapbox.pirates'),
      Emerald: L.mapbox.tileLayer('mapbox.emerald'),
      HighContrast: L.mapbox.tileLayer('mapbox.high-contrast')
};

layers.Dark.addTo(map);
L.control.layers(layers).addTo(map);
