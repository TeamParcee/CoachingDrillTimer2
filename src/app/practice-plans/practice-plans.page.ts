import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Plan } from './practice-plan.service';
import * as moment from 'moment';

@Component({
  selector: 'app-practice-plans',
  templateUrl: './practice-plans.page.html',
  styleUrls: ['./practice-plans.page.scss'],
})
export class PracticePlansPage implements OnInit {

  constructor() { }

  plans: Plan[];
  upcomingPlans;
  pastPlans;

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.getupcomingPlans();
    this.getPastPlans();
  }
  getupcomingPlans() {
    let uid = localStorage.getItem('uid');
    let now = new Date().getTime();
    firebase.firestore().collection("/users/" + uid + "/plans")
      .where("startTimestamp", ">=", now)
      .orderBy("startTimestamp")
      .onSnapshot((plansSnap) => {
        let plans = [];
        plansSnap.forEach(async (plan) => {
          let activityRef = await plan.ref.collection("/activities").get();
          let activitiesCount = (activityRef) ? activityRef.size : 0;
          let p = { ...plan.data() }
          p.activitiesCount = activitiesCount;
          plans.push(p);
        })
        this.upcomingPlans = plans;
      })
  }

  getPastPlans() {
    let uid = localStorage.getItem('uid');
    let now = new Date().getTime();
    firebase.firestore().collection("/users/" + uid + "/plans")
      .where("startTimestamp", "<", now)
      .orderBy("startTimestamp", "desc")
      .onSnapshot((plansSnap) => {
        let plans = [];
        plansSnap.forEach(async (plan) => {
          let activityRef = await plan.ref.collection("/activities").get();
          let activitiesCount = (activityRef) ? activityRef.size : 0;
          let p = { ...plan.data() }
          p.activitiesCount = activitiesCount;
          plans.push(p);
        })
        this.pastPlans = plans;
      })
  }

  getCalendarDate(date) {

    let day: any = new Date(date).getDay();
    switch (day) {
      case 0:
        day = "Sun"
        break;
      case 1:
        day = "Mon"
        break;
      case 2:
        day = "Tue"
        break;
      case 3:
        day = "Wed"
        break;
      case 4:
        day = "Thu"
        break;
      case 5:
        day = "Fri"
        break;
      case 6:
        day = "Sat"
        break;
    }
    return {
      date: new Date(date).getDate(),
      day: day
    }
  }
  groupPlans(plan: Plan, planIndex, allPlans: Plan[]) {
    let now = new Date().getTime();
    if (planIndex == 0 && now > plan.startTimestamp) {
      return "Past Practice"
    }
    if (planIndex == 0 && now < plan.startTimestamp) {
      return "upcoming Practice"
    }
    if (now < plan.startTimestamp && now > allPlans[planIndex - 1].startTimestamp) {
      return "upcoming Practice"
    }
  }
}
