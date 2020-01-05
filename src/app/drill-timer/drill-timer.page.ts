import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { HelperService } from '../shared/helper.service';
import { ViewNotesPage } from './view-notes/view-notes.page';
import { TimerService } from './timer.service';
import { Activity } from '../practice-plans/practice-plan.service';
import * as moment from 'moment';

@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private helper: HelperService,
    private timerService: TimerService,
  ) { }

  plan;
  activities: Activity[];
  currentActivity;
  nextActivity;
  interval;
  timer;
  timerRaw;
  noPlan;
  planEndTime;
  planStartTime;
  planDuration = 0;
  currentTimeStamp;
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getNextPlan();
    console.log("getting current activity");
    this.interval = setInterval(() => {
      this.currentTimeStamp = new Date().getTime();
      console.log(this.currentTimeStamp < this.plan.startTimestamp, this.plan.startTimestamp, this.currentTimeStamp)
      if (this.activities) {
        this.getCurrentActivity();
      }
    }, 1000)
  }

  ionViewWillLeave() {
    console.log("stoppoing getting current activity");
    clearInterval(this.interval)
  }
  getNextPlan() {

    let uid = localStorage.getItem('uid');
    let now = new Date().getTime();
    firebase.firestore().collection("users/" + uid + "/plans")
      .where("endTimestamp", ">=", now)
      .orderBy("endTimestamp")
      .limit(1)
      .onSnapshot((plansSnap) => {
        if (plansSnap.empty) {
          this.activities = null;
          return;
        }
        if (!plansSnap.empty) {
          this.plan = plansSnap.docs[0].data();
          let planRef = plansSnap.docs[0].ref;
          planRef.collection("activities").orderBy("order").get().then((activitiesSnap) => {
            let activities: Activity[] = [];
            if (activitiesSnap.empty) {
              this.activities = [];
              return;
            }
            let planDuration = 0;
            activitiesSnap.forEach((activity) => {
              let a = { ...activity.data() };
              a.date = this.plan.date;
              activities.push(a);
              planDuration = (a.duration * 1) + planDuration;
            })
            let preActivity: Activity = {
              name: "Pre Practice",
              startTime: moment(activities[0].startTime, "h:mm A").subtract(5, "minutes").format("h:mm A"),
              endTime: activities[0].startTime,
              duration: 5,
              date: this.plan.date,
            }
            activities.splice(0, 0, preActivity);
            this.activities = activities;
            this.planEndTime = this.plan.endTime;
            this.planStartTime = this.plan.startTime
            this.planDuration = planDuration;
          })
        }
      })
  }

  viewNotes(activity) {
    this.helper.openModal(ViewNotesPage, { activity: activity })
  }

  getCurrentActivity() {
    this.timerService.getCurrentActivity(this.activities);
    this.currentActivity = this.timerService.currentActivity;
    this.nextActivity = this.timerService.nextActivity;
    this.timerRaw = this.timerService.timerRaw;
    this.timer = this.timerService.timer;
    if (this.timer == "0:00") {
      setTimeout(() => {
        if (this.timer == "0:00") {
          this.getNextPlan();
          this.plan = null;
        }
      }, 2000);
    }
  }
}
