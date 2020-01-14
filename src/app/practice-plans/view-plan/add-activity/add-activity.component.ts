import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/helper.service';
import { NgForm } from '@angular/forms';
import { FireStoreService } from 'src/app/shared/firestore.service';
import { Plan, Activity, PlanService } from '../../practice-plan.service';
import { NotificaitonService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
})
export class AddActivityComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private firestoreService: FireStoreService,
    private planService: PlanService,
    private notification: NotificaitonService,
  ) { }

  plan: Plan;
  activity: Activity = new Activity();
  isTemplate;


  ngOnInit() { }


  close() {
    this.helper.closeModal();
  }


  save(activityForm: NgForm) {
    if (this.isTemplate) {
      this.saveTemplateActivity(activityForm);
    } else {
      this.savePlanActivity(activityForm)
    }
  }
  savePlanActivity(activityForm: NgForm) {
    let form = activityForm.value;
    let uid = localStorage.getItem('uid');
    this.activity = {
      id: "",
      date: this.plan.date,
      startTime: "",
      endTime: "",
      duration: form.duration,
      order: 1000 + this.plan.activitiesCount,
      notes: form.notes,
      name: form.name,

    }
    this.firestoreService.addDocument("/users/" + uid + "/plans/" + this.plan.id + "/activities", { ...this.activity }).then((id) => {
      this.planService.updateActivityCount(this.plan);
      this.helper.closeModal();
    })
  }

  saveTemplateActivity(activityForm: NgForm) {
    let form = activityForm.value;
    let uid = localStorage.getItem('uid');
    this.activity = {
      id: "",
      date: this.plan.date,
      startTime: "",
      endTime: "",
      duration: form.duration,
      order: 1000 + this.plan.activitiesCount,
      notes: form.notes,
      name: form.name,

    }
    this.firestoreService.addDocument("/users/" + uid + "/templates/" + this.plan.id + "/activities", { ...this.activity }).then(() => {
      this.planService.updateActivityCountTemplate(this.plan);
      this.helper.closeModal();
    })
  }
}
