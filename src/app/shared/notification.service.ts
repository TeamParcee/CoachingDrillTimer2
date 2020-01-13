import { Injectable } from "@angular/core";
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationTrigger } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';


@Injectable({
    providedIn: "root"
})
export class NotificaitonService {
    constructor(private ln: LocalNotifications) {
    }




    create(title, date) {
        let timestamp = new Date(date).getTime();
        let trigger: ILocalNotificationTrigger = {
            at: new Date(moment(date).format("MMMM DD, YYYY HH:MM:SS")),
        }
        console.log(new Date(moment(date).format("MMMM DD, YYYY HH:MM:SS")), "<==========this is this date")
        this.ln.schedule({
            id: timestamp,
            title: title,
            trigger: trigger,
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