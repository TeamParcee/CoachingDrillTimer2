import { Injectable, wtfStartTimeRange } from "@angular/core";
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationTrigger } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';


@Injectable({
    providedIn: "root"
})
export class NotificaitonService {
    constructor(private ln: LocalNotifications) {
    }




    create(id, name, startTime, date) {
        let trigger: ILocalNotificationTrigger = {
            at: new Date(moment(date).format("MMMM DD, YYYY hh:mm:ss")),
        }
        this.ln.schedule({
            id: id,
            title: name,
            text: startTime,
            trigger: trigger,
            foreground: true,
            sound: "file://assets/iphone_alarm_morning.mp3",
        })
    }

    delete(id) {
        return new Promise((resolve) => {
            this.ln.clear(id).then(() => {
                return resolve()
            })
        })
    }

}