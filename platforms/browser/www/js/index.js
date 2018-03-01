// /*
//  * Licensed to the Apache Software Foundation (ASF) under one
//  * or more contributor license agreements.  See the NOTICE file
//  * distributed with this work for additional information
//  * regarding copyright ownership.  The ASF licenses this file
//  * to you under the Apache License, Version 2.0 (the
//  * "License"); you may not use this file except in compliance
//  * with the License.  You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing,
//  * software distributed under the License is distributed on an
//  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  * KIND, either express or implied.  See the License for the
//  * specific language governing permissions and limitations
//  * under the License.
//  */
//
//
// // This example displays a marker at the center of Australia.
// // When the user clicks the marker, an info window opens.
//
// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 3,
//     center: {lat: 0, lng: 0},
//     mapTypeId: 'terrain'
//   });
//
//   // Create a <script> tag and set the USGS URL as the source.
//   var script = document.createElement('script');
//   // This example uses a local copy of the GeoJSON stored at
//   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//   script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//   document.getElementsByTagName('head')[0].appendChild(script);
// }
//
// // Loop through the results array and place a marker for each
// // set of coordinates.
// window.eqfeed_callback = function(results) {
//   for (var i = 0; i < results.features.length; i++) {
//     var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(coords[1],coords[0]);
//     var marker = new google.maps.Marker({
//       position: latLng,
//       map: map
//     });
//   }
// }
//
//   var coordsDiv = document.getElementById('coords');
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
//   map.addListener('mousemove', function(event) {
//     coordsDiv.textContent =
//         'lat: ' + Math.round(event.latLng.lat()) + ', ' +
//         'lng: ' + Math.round(event.latLng.lng());
//   });
//
//
//   var contentString = `<div id="content">
//     <div id="siteNotice">
//       </div>
//       <h1 id="firstHeading" class="firstHeading"></h1>
//       <div id="bodyContent"><p>
//       </p></div>
//     </div>`
//
//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
//   });
//
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//     title: 'Uluru (Ayers Rock)'
//   });
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
//
//
//
// let app = {
//   // Application Constructor
//   initialize: function () {
//     // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
//     this.receivedEvent.call(this)
//   },
//
//   // deviceready Event Handler
//   //
//   // Bind any cordova events here. Common events are:
//   // 'pause', 'resume', etc.
//   onDeviceReady: function () {
//     this.receivedEvent('deviceready')
//   },
//
//   // Update DOM on a Received Event
//   receivedEvent: function (id) {
//     let parentElement = document.getElementById(id)
//     let map = document.getElementById('map')
//     // new google.maps.Map(map)
//   }
// }
//
// app.initialize()
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}