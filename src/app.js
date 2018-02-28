import 'angular'
import 'angular-animate'
import 'angular-aria'
import 'angular-sanitize'
import 'angular-ui-router'
import 'ngstorage'

export default angular.module('app', [
    'ngAria',
    'ngAnimate',
    'ngSanitize',
    'ngStorage',
    'ui.router'
])
.config($compileProvider => {
    if (process.env.NODE_ENV !== 'development') {
        $compileProvider.debugInfoEnabled(false)
    }
})
.config($urlRouterProvider => {
    $urlRouterProvider.otherwise('/')
})
.config($locationProvider => {
    $locationProvider.html5Mode(true)
})
