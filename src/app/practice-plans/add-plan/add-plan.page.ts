import { Component, OnInit } from '@angular/core';
import { PlanService, Plan } from '../practice-plan.service';
import { HelperService } from 'src/app/shared/helper.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

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
  ngOnInit() {
  }


  save(planForm: NgForm) {
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
