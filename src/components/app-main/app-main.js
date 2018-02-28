import app from '../../app'
import templateUrl from './app-main.html'

class AppMain {
    constructor() {
    }
}

app
.config($stateProvider => {
    $stateProvider.state('main', {
        url: '/',
        template: `<home-page></home-page>`,
        component: 'appMain'
    })
})
app.component('appMain', {
    templateUrl,
    controller: AppMain
})
