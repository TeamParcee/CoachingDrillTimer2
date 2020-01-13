import { Injectable } from "@angular/core";
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationTrigger } from '@ionic-native/local-notifications/ngx';



@Injectable({
    providedIn: "root"
})
export class NotificaitonService {
    constructor(private ln: LocalNotifications) {
    }




    create(title, date) {
        let timestamp = new Date(date).getTime();

        let trigger: ILocalNotificationTrigger = {
            at: new Date("January 12, 2020 21:02:00"),
        }
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