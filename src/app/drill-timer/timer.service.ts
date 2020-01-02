import { Injectable } from "@angular/core";
import { Activity } from '../practice-plans/practice-plan.service';
import * as moment from 'moment';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { HelperService } from '../shared/helper.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Injectable({
    providedIn: 'root'
})
export class TimerService {

    constructor(
        private vibration: Vibration,
        private helper: HelperService,
        private localNotifications: LocalNotifications,
        private backgroundMode: BackgroundMode,
        private media: Media,
    ) {
        this.alarmFile = this.media.create('https://firebasestorage.googleapis.com/v0/b/parceesportsplanner.appspot.com/o/iphone_alarm_morning.mp3?alt=media&token=76784c6e-1f1b-481a-a12f-7bc1cb121f6a');

    }
    timer;
    pastCurrentActivity;
    completedActivities = [];
    currentActivity;
    nextActivity;
    interval;
    alarmFile:MediaObject;

    getCurrentActivity(activities: Activity[]) {
        let index = 0;
        for (let activity of activities) {
            let now = new Date().getTime();
            let startTimestamp = new Date(activity.date + " " + activity.startTime).getTime();
            let endTimestamp = new Date(activity.date + " " + activity.endTime).getTime();
            let startDistance = endTimestamp - now;
            if (startDistance > 300577 && index == 0) {
                this.timer = moment(startTimestamp).calendar()
                break
            }


            if (endTimestamp > now) {
                let time = endTimestamp - now;
                let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((time % (1000 * 60)) / 1000);
                this.timer = ((minutes.toString().length == 1) ? "0" + minutes.toString() : minutes) + ":" + ((seconds.toString().length == 1) ? "0" + seconds.toString() : seconds);
                this.currentActivity = activity;
                this.nextActivity = activities[index + 1]
                break;

            }
            index++;
            if (!this.completedActivities.includes(activity.id, 0)) {
                this.completedActivities.push(activity.id);
                this.activityCompleted(activities[index]);
            }
        }
    }


    // createNotification(activity) {
    //     let time = new Date(activity.date + " " + activity.endTime).getTime();

    //     this.localNotifications.schedule({
    //         text: activity.name,
    //         vibrate: true,
    //         trigger: { at: new Date(time) },
    //         actions: [{
    //             id: "OK", title: "OK",
    //         }]
    //     })

    //     this.localNotifications.on('OK', () => {
    //         console.log("hey that worked")
    //     })
    // }

    activityCompleted(activity) {
        this.stopVibrating();
        this.backgroundMode.unlock();
        this.alarmFile.play();
        this.interval = setInterval(() => {
            this.vibration.vibrate(10000)
        }, 1000)
        this.showStopTimerAlert(activity);
    }

    showStopTimerAlert(activity) {
        this.helper.stopTimerAlert(activity).then(() => {
            this.stopVibrating();
        })
    }
    stopVibrating() {
        clearInterval(this.interval);
        this.alarmFile.stop();
    }
}