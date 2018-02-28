import app from '../../app'
import templateUrl from './event-filter.html'

class EventFilterController {
    constructor($scope, EventService) {
        this.scope = $scope
        this.filterDict = EventService.eventDict
        // this.bindedSearch = this.search.bind(this)
    }
}

app.component('eventFilter', {
    templateUrl,
    controller: EventFilterController,
    bindings: {
        eventDict: '='
    }
})
