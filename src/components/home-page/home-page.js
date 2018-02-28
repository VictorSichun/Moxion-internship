import app from '../../app'
import templateUrl from './home-page.html'

app
.component('homePage', {
    templateUrl
})

.config($stateProvider => {
    const homePage = {
        name: 'homePage',
        url: '/homePage',
        template: '<home-page></home-page>'
    }
    $stateProvider.state(homePage)
})
