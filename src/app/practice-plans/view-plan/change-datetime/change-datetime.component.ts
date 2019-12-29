import { Component, OnInit } from '@angular/core';
import { Plan } from '../../practice-plan.service';
import * as moment from 'moment';
import { HelperService } from 'src/app/shared/helper.service';
import { FireStoreService } from 'src/app/shared/firestore.service';

@Component({
  selector: 'app-change-datetime',
  templateUrl: './change-datetime.component.html',
  styleUrls: ['./change-datetime.component.scss'],
})
export class ChangeDatetimeComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private firestoreService: FireStoreService,
  ) { }

  plan: Plan;

  startTime;
  date;
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.startTime = moment(this.plan.startTime, "h:mm A").format();
    this.date = this.plan.date;
  }

  save() {
    let uid = localStorage.getItem('uid');
    let startTime = moment(this.startTime).format("h:mm A");
    let endTime = moment(this.startTime).add(this.plan.duration, "minutes").format("h:mm A");
    let date = moment(this.date).format("MMM DD, YYYY");
    let startDatetime = date + " " + startTime;
    let startTimestamp = new Date(startDatetime).getTime();
    let endDatetime = date + " " + startTime;
    let endTimestamp = new Date(endDatetime).getTime();

    let plan = {
      startTime: startTime,
      endTime: endTime,
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp,
      date: date,
    }
    this.firestoreService.updateDocument("/users/" + uid + "/plans/" + this.plan.id, { ...plan }).then(() => {
      this.helper.closePopover();
    })
  }
}
