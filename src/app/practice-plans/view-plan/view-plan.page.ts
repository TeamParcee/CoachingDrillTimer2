import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/helper.service';
import { PlanService, Plan, Activity } from '../practice-plan.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import * as moment from 'moment';
import { ChangeDatetimeComponent } from './change-datetime/change-datetime.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { FireStoreService } from 'src/app/shared/firestore.service';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.page.html',
  styleUrls: ['./view-plan.page.scss'],
})
export class ViewPlanPage implements OnInit {

  constructor(
    private helper: HelperService,
    private planService: PlanService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private firestoreService: FireStoreService,
  ) { }

  ngOnInit() {
  }

  plan: Plan
  activities: Activity[];
  planEndTime;
  planDuration = 0;

  ionViewWillEnter() {
    this.getId();
  }

  ionViewWillLeave() {
    this.saveActivities();
    this.saveEndtime(); 
  }
  getId() {
    this.route.paramMap.subscribe((paramMap) => {
      let id = paramMap.get('id') as string
      this.getPlan(id);
    })
  }
  getPlan(id: string) {
    let uid = localStorage.getItem('uid')
    firebase.firestore().doc("users/" + uid + "/plans/" + id).onSnapshot((planSnapshot) => {
      this.plan = planSnapshot.data();
      planSnapshot.ref.collection("activities").orderBy("order").onSnapshot((activitiesSnap) => {
        let activities = [];
        activitiesSnap.forEach((activity) => {
          let a = { ...activity.data() };
          activities.push(a);
        })
        this.activities = activities;
        if(this.activities.length == 0){
          this.planEndTime = this.plan.endTime;
        }
        this.updateStartTime();
      })
    })
  }
  deletePlan() {
    this.helper.confirmationAlert("Delete Plan", "Are you sure you want to delete this plan?", { denyText: "Cancel", confirmText: "Delete Plan" }).then((result) => {
      if (result) {
        this.planService.deletePlan(this.plan).then(() => {
          this.navCtrl.navigateBack("/tabs/practice-plans")
        })
      }
    })
  }

  editDateTime(event) {
    this.helper.presentPopover(event, ChangeDatetimeComponent, { plan: this.plan })
  }
  addActivity() {
    this.helper.openModal(AddActivityComponent, { plan: this.plan })
  }

  editActivity(activity) {
    this.helper.openModalPromise(EditActivityComponent, { plan: this.plan, activity: activity }).then(() => {
      this.getPlan(this.plan.id)
    })
  }



  reorderActivities(event) {

    let activities = [...this.activities];
    let from = event.detail.from;
    let to = event.detail.to;

    let movedItem = activities.splice(from, 1)[0];
    activities.splice(to, 0, movedItem);

    this.activities = activities;
    this.updateStartTime();
    event.detail.complete()
  }



  updateStartTime() {
    let previousDuration = 0;
    let previousStartTime = this.plan.startTime;
    let count = 0;
    this.planDuration = 0;
    this.activities.forEach((activity) => {
      activity.order = count;
      activity.startTime = moment(previousStartTime, "h:mm A").add(previousDuration, "minutes").format("h:mm A");
      activity.endTime = moment(activity.startTime, "h:mm A").add(activity.duration, "minutes").format("h:mm A");
      previousDuration = activity.duration;
      previousStartTime = activity.startTime;
      this.planEndTime = activity.endTime;
      this.planDuration = (activity.duration * 1) + this.planDuration;
      count++;
    })
  }

  saveActivities() {
    let uid = localStorage.getItem('uid');
    this.activities.forEach((activity) => {
      this.firestoreService.updateDocument("users/" + uid + "/plans/" + this.plan.id + "/activities/" + activity.id, { ...activity });
    })
  }

  saveEndtime() {
    let uid = localStorage.getItem('uid');
    this.firestoreService.updateDocument("users/" + uid + "/plans/" + this.plan.id, { endTimestamp: new Date(this.plan.date + " " + this.planEndTime).getTime() })
  }
}
