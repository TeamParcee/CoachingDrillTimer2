import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { HelperService } from '../shared/helper.service';
import { ViewNotesPage } from './view-notes/view-notes.page';
import { TimerService } from './timer.service';
import { Activity } from '../practice-plans/practice-plan.service';
import * as moment from 'moment';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';


@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private helper: HelperService,
    private timerService: TimerService,
    private nr: NativeRingtones,
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

  ionViewWillEnter() {
    this.interval = setInterval(() => {
      this.currentTimestamp = new Date().getTime();
      this.plan = this.timerService.plan;
      this.activities = this.timerService.activities;
      this.currentActivity = this.timerService.currentActivity;
      this.nextActivity = this.timerService.nextActivity;
      this.timerRaw = this.timerService.timerRaw;
      this.timer = this.timerService.timer;
      let x:any = this.activities[0];
    }, 1000)
  }

  music(){
    this.timerService.alarmFile.play();
  }
  ionViewWillLeave() {
    clearInterval(this.interval)
  }
  viewNotes(activity) {
    this.helper.openModal(ViewNotesPage, { activity: activity })
  }


}
