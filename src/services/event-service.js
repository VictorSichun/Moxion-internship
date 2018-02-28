import app from '../app'

class EventService {
    constructor($timeout, $http) {
        this.timeout = $timeout
        this.http = $http
        this.eventList = ['UNKNOWN', 'UPLOAD', 'VIEW', 'DOWNLOAD', 'DELETE', 'INVITE', 'JOIN', 'COMMENT', 'LEAVE', 'PLAYLINK_CREATED', 'PLAYLINK_SENT']
        this.eventDict = this.getEventDict()
        this.trigger()
        this.listeners = []
    }

    getEventDict() {
        const dict = {}
        for (let i = 0; i < this.eventList.length; i++) {
            dict[this.eventList[i]] = true
        }
        return dict
    }

    catchEvents() {
        const generateTime = new Date(Number(new Date()) - 120000)
        let updateTime = generateTime.toISOString()
        updateTime = updateTime.substring(0, updateTime.indexOf('T'))
        // alert(updateTime)
        this.http.post('https://ws1.moxion.io/get/activity',
            {data: {project_id: '0B043CF5377D4468E10CA9935C4F1AB0', limit: 10, updated_since: updateTime},
                token: '222115D337EF65F145B77B47C744ED7190BF0590F7F8EAE676D9CFDEF3CDBBC4'
            }).then(data => {
                const response = data.data
                const dataLen = response.length
                let currentData = {}
                for (let i = 0; i < dataLen; i++) {
                    currentData = response[i].data

                    const userName = currentData.user.user_first_name + ' ' + currentData.user.user_last_name
                    let userInfo = {Email: currentData.user.user_email, Location: currentData.city, Latitude: currentData.latitude, Longitude: currentData.longitude, Time: currentData.time, Production: currentData.asset_name}

                    const userEvent = currentData.type
                    userInfo = JSON.stringify(userInfo)
                    for (let j = 0; j < this.listeners.length; j++) {
                        this.listeners[j](userEvent, userName, userInfo)
                    }
                }
                //alert(currentData)
                this.trigger()
            })
    }

    trigger() {
        const randomSec = (Math.random() * 1000) * 10
        this.timeout(() => this.catchEvents(this.callback), randomSec)
    }

    addListener(callback) {
        this.callback = callback
        this.listeners.push(this.callback)
    }
}

app.service('EventService', EventService)
