import { Injectable } from "@angular/core";
import { Activity } from '../practice-plans/practice-plan.service';
    import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class TimerService {

    timer;
    currentActivity;
    nextActivity;

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
                this.timer = minutes + ":" + ((seconds.toString().length == 1) ? "0" + seconds.toString() : seconds);
                this.currentActivity = activity;
                this.nextActivity = activities[index + 1]
                break;
            }
            index++;
        }
    }

    getCountDownTime() {

    }
}