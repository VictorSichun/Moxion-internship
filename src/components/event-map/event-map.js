import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import app from '../../app'
import templateUrl from './event-map.html'

class EventMapController {
    constructor($scope, EventService) {
        this.mymap = L.map('mapid')
        this.mymap.setView([-36.848461, 174.763336], 13)
        this.setUpMap()
        this.bindedOnMapClick = this.onMapClick.bind(this)
        // this.bindedSearch = this.search.bind(this)
        this.popup = L.popup()
        this.mymap.on('click', this.bindedOnMapClick)
        this.bindedshowOnMap = this.showOnMap.bind(this)
        EventService.addListener((event, name, info) => {
            this.bindedshowOnMap(info)
        })
    }
    setUpMap() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoidmljdG9yc2ljaHVuIiwiYSI6ImNqNjFiNGUwbTByemczMHA4d3ZnZDlmN3UifQ.6oA9DYk54MWokGUoollj2g'
        }).addTo(this.mymap)
    }

    onMapClick(e) {
        this.popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(this.mymap)
    }

    showOnMap(info) {
        const userInfo = JSON.parse(info)
        L.popup()
        .setLatLng([userInfo.Latitude, userInfo.Longitude])
        .setContent('My location is ' + userInfo.Location)
        .openOn(this.mymap)
    }

}
app.component('eventMap', {
    templateUrl,
    controller: EventMapController
})

.config($stateProvider => {
    const map = {
        name: 'map',
        url: '/eventMap',
        template: '<event-map></event-map>'
    }
    $stateProvider.state(map)
})
