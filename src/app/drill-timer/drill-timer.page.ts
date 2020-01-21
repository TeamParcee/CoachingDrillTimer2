import { Component, OnInit } from '@angular/core';
import { HelperService } from '../shared/helper.service';
import { ViewNotesPage } from './view-notes/view-notes.page';
import { TimerService } from './timer.service';
import { Activity } from '../practice-plans/practice-plan.service';
import * as moment from 'moment';
import { PresenceService } from './presence.service';


@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private helper: HelperService,
    private timerService: TimerService,
    private presence: PresenceService
  ) { }

  plan;
  activities: Activity[];
  currentActivity;
  nextActivity;
  interval;
  timer;
  timerRaw;
  noPlan;
  planEndTime;
  planStartTime;
  planDuration = 0;
  currentTimestamp;
  showLoading = true;
  ngOnInit() {
    setTimeout(() => {
      this.showLoading = false;
    }, 2000)
  }

  async ionViewWillEnter() {
    await this.presence.onlineStatus();
    this.timerService.getNextPlan().then(() => {
      this.interval = setInterval(() => {
        this.timerService.getCurrentActivity();
        this.currentTimestamp = new Date().getTime();
        this.plan = this.timerService.plan;
        this.activities = this.timerService.activities;
        this.currentActivity = this.timerService.currentActivity;
        this.nextActivity = this.timerService.nextActivity;
        this.timerRaw = this.timerService.timerRaw;
        this.timer = this.timerService.timer;
      }, 1000)
    })
  }

  ionViewWillLeave() {
    clearInterval(this.interval)
  }
  viewNotes(activity) {
    this.helper.openModal(ViewNotesPage, { activity: activity })
  }


}
