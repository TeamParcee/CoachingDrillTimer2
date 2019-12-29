import { Component, OnInit } from '@angular/core';
import { Plan, Activity, PlanService } from '../../practice-plan.service';
import { HelperService } from 'src/app/shared/helper.service';
import { FireStoreService } from 'src/app/shared/firestore.service';

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
  ) { }

  plan: Plan;
  activity: Activity;
  editActivity: Activity = { ...this.activity }

  ngOnInit() { }

  ionViewWillEnter() {
    this.editActivity = { ...this.activity }
  }
  close() {
    this.helper.closeModal();
  }
  save() {
    let uid = localStorage.getItem('uid');
    this.firestoreService.setDocument("/users/" + uid + "/plans/" + this.plan.id + "/activities/" + this.activity.id, this.editActivity).then(() => {
      this.close();
    })
  }

  delete() {
    let uid = localStorage.getItem('uid');
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity?", { denyText: "Cancel", confirmText: "Delete Activity" }).then((result) => {
      if (result) {
        this.firestoreService.deleteDocument("/users/" + uid + "/plans/" + this.plan.id + "/activities/" + this.editActivity.id).then(() => {
          this.planService.updateActivityCount(this.plan);
          this.helper.closeModal();
        })
      }
    })
  }
}
