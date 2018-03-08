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
const API_HOST = 'http://events-locator-api.herokuapp.com/api/v1/events';

var map,
    overlay;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });

    overlay = new google.maps.OverlayView();
    overlay.draw = function () {
    };
    overlay.setMap(map);

    //  renderEventsOnMap(event, map);
    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' + '<span>' + this.createdByName + '</span>'
    '<h1 id="firstHeading" class="firstHeading">Name event' + this.name + '</h1>' +
    '<div class="time">' + this.time + '</div>'
    '<div id="bodyContent">' +
    '<p>' + this.description + '</p>' +
    '</div>' +
    '</div>';

    google.maps.event.addListener(map, "click", function (e) {
        var clickPosition = e.latLng;
        $('#pop-up').removeClass('displayNone').addClass('displayB');
        renderEventsOnMap(e, map);
        var point = new google.maps.Point(event.pageX, event.pageY);
        var location = overlay.getProjection().fromContainerPixelToLatLng(point); //получаем координаты по значениям X,Y клика
        console.log(location);
    });

    var infowindow = new google.maps.InfoWindow({

        content: contentString
    });
}

function renderEventsOnMap(event, map) {
    let marker = new google.maps.Marker({
        position: initMap.location,
        map: map
    })
    let infoContent = `<div class="info">
                <h4 class="title">${initMap.name}</h4>
                <p class="data">${initMap.time}</p>
            </div>`
    let infoWindow = new google.maps.InfoWindow({
        content: infoContent
    })
    marker.addListener('click', () => {
        infoWindow.open(map, marker)
    })
}

function postEvent(data) {
    return axios(`${API_HOST}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then((result) => {
        return result
    }).catch(err => {
        console.log(err)
    })
}

function submitEvent() {
    $('#pop-up').removeClass('displayB').addClass('displayNone');
    $('#add-event').removeClass('displayNone');
    let name = $('#name').val()
    let description = $('#description').val()
    let time = $('#date').val()
    let coords = initMap.location;
    let createdByName = $('#createdByName').val()
    let createdByEmail = $('#createdByEmail').val()
    let newEvent = {name, description, time, coords, createdBy: {name: createdByName, email: createdByEmail}}
    this.postEvent(newEvent)
        .then((event) => {
            this.renderEventsOnMap(initMap.location, this.map)
        })
}

function cancelModal() {
    $('#pop-up').removeClass('displayB').addClass('displayNone');
}
