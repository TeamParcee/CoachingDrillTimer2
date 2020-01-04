import { Component, OnInit } from '@angular/core';
import { PlanService, Plan } from '../practice-plan.service';
import { HelperService } from 'src/app/shared/helper.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  constructor(
    private planService: PlanService,
    private helper: HelperService,
    private navCtrl: NavController,
  ) { }

  plan: Plan = new Plan();
  template;
  templates;

  ngOnInit() {
  }


ionViewWillEnter(){
  this.getTemplates();
}

  getTemplates() {
    let uid = localStorage.getItem('uid');
    firebase.firestore().collection("/users/" + uid + "/templates").get().then((templatesSnap) => {
      let templates = [];
      templatesSnap.forEach((template) => {
        templates.push(template.data())
      })
      this.templates = templates;
    })
  }

  save(planForm: NgForm) {

    this.template = (!this.template) ? 'No Template' : this.template;
    this.helper.showLoading();
    let form = planForm.value;
    let startTime = moment(form.time).format("h:mm A");
    let endTime = moment(form.time).format("h:mm A");
    let date = moment(form.date).format("MMM DD, YYYY");
    let datetime = date + " " + startTime;
    let startTimestamp = new Date(datetime).getTime();

    this.plan = {
      activitiesCount: 0,
      startTime: startTime,
      endTime: endTime,
      date: date,
      startTimestamp: startTimestamp,
      endTimestamp: startTimestamp,
      template: this.template,
    }

    this.planService.addPlan(this.plan).then(() => {
      this.helper.hideLoading();
      this.navCtrl.navigateBack("/tabs/practice-plans");
    }).catch((error) => {
      this.helper.hideLoading();
      this.helper.okAlert("There was a problem", error.message)
    })
  }

}
