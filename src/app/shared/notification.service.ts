import { Injectable, wtfStartTimeRange } from "@angular/core";
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationTrigger } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';
import { HelperService } from './helper.service';


@Injectable({
    providedIn: "root"
})
export class NotificaitonService {
    constructor(private ln: LocalNotifications,
        private helper: HelperService,) {
    }




    create(id, name, startTime, date) {
        let trigger: ILocalNotificationTrigger = {
            at: new Date(moment(date).format("MMMM DD, YYYY HH:mm:ss")),
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

    update(id, name, startTime, date) {
        let trigger: ILocalNotificationTrigger = {
            at: new Date(moment(date).format("MMMM DD, YYYY HH:mm:ss")),
        }
        this.ln.update({
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