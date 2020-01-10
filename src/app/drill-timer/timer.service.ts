import { Injectable } from "@angular/core";
import { Activity } from '../practice-plans/practice-plan.service';
import * as moment from 'moment';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { HelperService } from '../shared/helper.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

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
    timerRaw;
    plan;
    activities;
    pastCurrentActivity;
    completedActivities = [];
    currentActivity;
    nextActivity;
    interval;
    alarmFile: MediaObject;

    getCurrentActivity(activities: Activity[]) {
        let index = 0;
        for (let activity of activities) {
            let now = new Date().getTime();
            let startTimestamp = new Date(activity.date + " " + activity.startTime).getTime();
            let endTimestamp = new Date(activity.date + " " + activity.endTime).getTime();
            let startDistance = endTimestamp - now;
            this.timerRaw = startDistance;
            if (startDistance > 300577 && index == 0) {
                this.timer = moment(startTimestamp).calendar()
                break
            }


            if (endTimestamp > now) {
                activity.showAlert = true;
                let time = endTimestamp - now;
                let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((time % (1000 * 60)) / 1000);
                this.timer = ((minutes.toString().length == 1) ? "0" + minutes.toString() : minutes) + ":" + ((seconds.toString().length == 1) ? "0" + seconds.toString() : seconds);
                this.currentActivity = activity;
                this.nextActivity = activities[index + 1]
                break;

            }
            index++;
            console.log(activity.name);
            if (!this.completedActivities.includes(activity.id, 0)) {
                this.completedActivities.push(activity.id);
                if (activity.showAlert) {
                    this.activityCompleted(activities[index - 1]);
                }
            }
        }
    }

    getNextPlan() {
        return new Promise((resolve) => {

            let uid = localStorage.getItem('uid');
            let now = new Date().getTime();
            firebase.firestore().collection("users/" + uid + "/plans")
                .where("endTimestamp", ">=", now)
                .orderBy("endTimestamp")
                .limit(1)
                .onSnapshot((plansSnap) => {
                    if (plansSnap.empty) {
                        this.currentActivity = null;
                        this.plan = null;
                        this.activities = null;
                        return;
                    }
                    if (!plansSnap.empty) {
                        this.plan = plansSnap.docs[0].data();
                        let planRef = plansSnap.docs[0].ref;
                        planRef.collection("activities").orderBy("order").get().then((activitiesSnap) => {
                            let activities: Activity[] = [];
                            if (activitiesSnap.empty) {
                                this.activities = null;
                            } else {
                                let planDuration = 0;
                                activitiesSnap.forEach((activity) => {
                                    let a = { ...activity.data() };
                                    a.date = this.plan.date;
                                    a.showAlarm = false;
                                    activities.push(a);
                                    planDuration = (a.duration * 1) + planDuration;
                                })
                                this.updateStartTime(activities).then((acts: any) => {
                                    let preActivity: Activity = {
                                        name: "Pre Practice",
                                        startTime: moment(acts[0].startTime, "h:mm A").subtract(5, "minutes").format("h:mm A"),
                                        endTime: acts[0].startTime,
                                        duration: 5,
                                        date: this.plan.date,
                                    }
                                    acts.splice(0, 0, preActivity);
                                    this.activities = acts;
                                })
                                this.completedActivities = [];
                            }
                        })
                    }
                })
            return resolve();
        })

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

    updateStartTime(activities) {
        return new Promise((resolve) => {
            let previousDuration = 0;
            let previousStartTime = this.plan.startTime;
            let count = 0;
            this.plan.duration = 0;
            activities.forEach((activity) => {
                activity.order = count;
                activity.startTime = moment(previousStartTime, "h:mm A").add(previousDuration, "minutes").format("h:mm A");
                activity.endTime = moment(activity.startTime, "h:mm A").add(activity.duration, "minutes").format("h:mm A");
                previousDuration = activity.duration;
                previousStartTime = activity.startTime;
                this.plan.endTime = activity.endTime;
                this.plan.duration = (activity.duration * 1) + this.plan.duration;
                count++;
            })
            return resolve(activities)
        })
    }


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