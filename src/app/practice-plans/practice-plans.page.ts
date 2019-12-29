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
