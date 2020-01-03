import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/app';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  activities;
  plan;


  ionViewWillEnter() {
    this.getId();
  }
  
  getId() {
    this.route.paramMap.subscribe((paramMap) => {
      let id = paramMap.get('id') as string
      this.getPlan(id);
    })
  }
  getPlan(id: string) {
    let uid = localStorage.getItem('uid')
    firebase.firestore().doc("users/" + uid + "/plans/" + id).onSnapshot((planSnapshot) => {
      this.plan = planSnapshot.data();
      planSnapshot.ref.collection("activities").orderBy("order").onSnapshot((activitiesSnap) => {
        let activities = [];
        activitiesSnap.forEach((activity) => {
          let a = { ...activity.data() };
          activities.push(a);
        })
        this.activities = activities;
        if (this.activities.length == 0) {
        }
      })
    })
  }
}
