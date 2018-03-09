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
const API_HOST = 'http://events-locator-api.herokuapp.com/api/v1/events'

var map,
    overlay
 // Initialization of the card.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: new google.maps.LatLng(49.444431, 32.059769),
        mapTypeId: 'terrain'
    })

    overlay = new google.maps.OverlayView()
    overlay.draw = function () {
    }
    overlay.setMap(map)

// Event for showing pop up.
    google.maps.event.addListener(map, "click", function (e) {
        var clickPosition = e.latLng
        $('#pop-up').removeClass('displayNone').addClass('displayB')
        renderEventsOnMap(e, map)
        var point = new google.maps.Point(event.pageX, event.pageY)
        var location = overlay.getProjection().fromContainerPixelToLatLng(point) //получаем координаты по значениям X,Y клика
        console.log(location);
    });
    console.log(API_HOST.events);
    for (var i = 0; i < API_HOST.events.length; i++) {
        var coords = API_HOST.events[i].coords;
        var latLng = new google.maps.LatLng(coords.lat, coords.lng);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
    this.getEvents()
        .then(events => {
            this.initializeMap(events)
            this.renderEventsList(events)
        })
}

function getEvents () {
    return axios(`${API_HOST}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }).then((result) => {
        return result.data.events
    }).catch(err => {
        console.log(err)
    })
}

// Adding markers.
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

// Hide pop up and to post event.
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
// To show pop up.
function cancelModal() {
    $('#pop-up').removeClass('displayB').addClass('displayNone')
}
