import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { HelperService } from 'src/app/shared/helper.service';
import { PlanService } from '../../practice-plan.service';
import { NavController } from '@ionic/angular';
import { AddActivityComponent } from '../../view-plan/add-activity/add-activity.component';
import { EditActivityComponent } from '../../view-plan/edit-activity/edit-activity.component';
import { FireStoreService } from 'src/app/shared/firestore.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private helper: HelperService,
    private planService: PlanService,
    private navCtrl: NavController,
    private firestoreService: FireStoreService,
  ) { }

  ngOnInit() {
  }

  activities;
  plan;
  planDuration;


  ionViewWillEnter() {
    this.getId();
  }

  ionViewWillLeave(){
    this.saveActivities();
  }

  getId() {
    this.route.paramMap.subscribe((paramMap) => {
      let id = paramMap.get('id') as string
      this.getPlan(id);
    })
  }
  getPlan(id: string) {
    let duration = 0;
    let uid = localStorage.getItem('uid')
    firebase.firestore().doc("users/" + uid + "/templates/" + id).onSnapshot((planSnapshot) => {
      this.plan = planSnapshot.data();
      planSnapshot.ref.collection("activities").orderBy("order").onSnapshot((activitiesSnap) => {
        let activities = [];
        activitiesSnap.forEach((activity) => {
          let a = { ...activity.data() };
          duration = duration + (a.duration * 1);
          activities.push(a);
        })
        this.activities = activities;
        this.planDuration = duration;

      })
    })
  }



  deleteTemplate() {
    this.helper.confirmationAlert("Delete Template", "Are you sure you want to delete this template?", { denyText: "Cancel", confirmText: "Delete Teamplate" }).then((result) => {
      if (result) {
        this.planService.deleteTemplate(this.plan).then(() => {
          this.navCtrl.navigateBack("/tabs/practice-plans/templates")
        })
      }
    })
  }

  addActivity() {
    this.helper.openModal(AddActivityComponent, { plan: this.plan, isTemplate: true })
  }

  editActivity(activity) {
    this.helper.openModalPromise(EditActivityComponent, { plan: this.plan, activity: activity, isTemplate: true }).then(() => {
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
    this.updateOrder();
    event.detail.complete()
  }

  updateOrder() {
    let count = 0;
    this.activities.forEach((activity) => {
      activity.order = count;
      count++;
    })
  }



  saveActivities() {
    let uid = localStorage.getItem('uid');
    this.activities.forEach((activity) => {
      this.firestoreService.updateDocument("users/" + uid + "/templates/" + this.plan.id + "/activities/" + activity.id, { ...activity });
    })
  }

}
