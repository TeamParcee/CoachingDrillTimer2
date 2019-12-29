import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/helper.service';
import { NgForm } from '@angular/forms';
import { FireStoreService } from 'src/app/shared/firestore.service';
import { Plan, Activity, PlanService } from '../../practice-plan.service';

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
  ) { }

  plan: Plan;
  activity: Activity = new Activity();
  ngOnInit() { }


  close() {
    this.helper.closeModal();
  }
  save(activityForm: NgForm) {
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
    this.firestoreService.addDocument("/users/" + uid + "/plans/" + this.plan.id + "/activities", { ...this.activity }).then(() => {
      this.planService.updateActivityCount(this.plan);
      this.helper.closeModal();
    })
  }
}
