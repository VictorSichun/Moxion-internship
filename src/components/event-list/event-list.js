import Fuse from 'fuse.js'
import app from '../../app'
import templateUrl from './event-list.html'

class EventListController {
// this might be loaded by $http;
    constructor(EventService, $scope) {
        this.scope = $scope
        this.eventDict = EventService.eventDict
        this.allList = []
        EventService.addListener((event, name, info) => {
            this.addEvent(event, name, info)
        })

        this.bindedCheckEvents = this.checkEvents.bind(this)
        const options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                'time',
                'eventName',
                'userName',
                'production',
                'Email',
                'Location'
            ]
        }
        this.fuse = new Fuse(this.allList, options)
        this.searchText = ''
        this.displayList = this.allList
        this.resultList = []
        this.bindedSearch = this.search.bind(this)
    }

    addEvent(event, name, info) {
        const userInfo = JSON.parse(info)
        const currentEvent = {time: '', eventName: '', userName: '', production: '', Email: '', Location: ''}
        currentEvent.time = userInfo.Time
        currentEvent.eventName = event
        currentEvent.userName = name
        currentEvent.production = userInfo.Production
        currentEvent.Email = userInfo.Email
        currentEvent.Location = userInfo.Location
        this.allList.splice(0, 0, currentEvent)
    }

    checkEvents(singleEvent) {
        // $log.log(this.eventDict)
        return this.eventDict[singleEvent.eventName]
    }

    search(text) {
        if (text) {
            this.displayList = this.fuse.search(text)
        } else {
            this.displayList = this.allList
        }
    }

}

app
.component('eventList', {
    templateUrl,
    controller: EventListController
})

.config($stateProvider => {
    const eventList = {
        name: 'eventList',
        url: '/eventList',
        template: '<event-list></event-list>'
    }
    $stateProvider.state(eventList)
})
