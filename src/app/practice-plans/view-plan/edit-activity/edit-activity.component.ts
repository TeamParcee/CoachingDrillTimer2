import { Component, OnInit } from '@angular/core';
import { Plan, Activity, PlanService } from '../../practice-plan.service';
import { HelperService } from 'src/app/shared/helper.service';
import { FireStoreService } from 'src/app/shared/firestore.service';
import { NotificaitonService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss'],
})
export class EditActivityComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private firestoreService: FireStoreService,
    private planService: PlanService,
    private notification: NotificaitonService,
  ) { }

  plan: Plan;
  activity: Activity;
  editActivity: Activity = { ...this.activity }
  isTemplate;

  ngOnInit() { }

  ionViewWillEnter() {
    this.editActivity = { ...this.activity }
  }
  close() {
    this.helper.closeModal();
  }

  save() {
    if (this.isTemplate) {
      this.saveTemplateActivity();
    } else {
      this.savePlanActivity();
    }
  }

  delete() {
    if (this.isTemplate) {
      this.deleteTemplateActivity()
    } else {
      this.deletePlanActivity();
    }
  }
  savePlanActivity() {
    let uid = localStorage.getItem('uid');
    this.firestoreService.setDocument("/users/" + uid + "/plans/" + this.plan.id + "/activities/" + this.activity.id, this.editActivity).then(() => {
      this.close();
    })
  }

  saveTemplateActivity() {
    let uid = localStorage.getItem('uid');
    this.firestoreService.setDocument("/users/" + uid + "/templates/" + this.plan.id + "/activities/" + this.activity.id, this.editActivity).then(() => {
      this.close();
    })
  }

  deletePlanActivity() {
    let uid = localStorage.getItem('uid');
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity?", { denyText: "Cancel", confirmText: "Delete Activity" }).then((result) => {
      if (result) {
        this.firestoreService.deleteDocument("/users/" + uid + "/plans/" + this.plan.id + "/activities/" + this.editActivity.id).then(() => {
          this.notification.delete(this.activity.notificationId);
          this.planService.updateActivityCount(this.plan);
          this.helper.closeModal();
        })
      }
    })
  }


  deleteTemplateActivity() {
    let uid = localStorage.getItem('uid');
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity?", { denyText: "Cancel", confirmText: "Delete Activity" }).then((result) => {
      if (result) {
        this.firestoreService.deleteDocument("/users/" + uid + "/templates/" + this.plan.id + "/activities/" + this.editActivity.id).then(() => {
          this.planService.updateActivityCountTemplate(this.plan);
          this.helper.closeModal();
        })
      }
    })
  }
}
