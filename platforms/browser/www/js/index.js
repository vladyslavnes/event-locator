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

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+'<span>'+CreatedBy+'</span>'
        '<h1 id="firstHeading" class="firstHeading">Name event'+name+'</h1>'+
           '<div class="time">'+time+'</div>'
        '<div id="bodyContent">'+
        '<p>'+description+'</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    google.maps.event.addListener(map, "dblclick", function (e) {
        var clickPosition = e.latLng;
        $('#pop-up').removeClass('displayNone').addClass('displayB');
    });

    google.maps.event.addListener(map, "click", function (e) {
        var clickPosition = e.latLng;
       // $('#pop-up').attr('display', 'none');
    });

}

// Loop through the results array and place a marker for each
// set of coordinates.

window.eqfeed_callback = function (results) {
    for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coords;
        var latLng = new google.maps.LatLng(coords[lat], coords[lng]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}