import app from '../app'

class API {
    constructor($http) {
        this.http = $http
    }
}

app
.service('API', API)
