import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  constructor(


  ) { }

  templates;
  plan;
  ngOnInit() {
  }


  ionViewWillEnter() {
    this.getTemplates();
  }
  getTemplates() {
    let uid = localStorage.getItem('uid');

    firebase.firestore().collection("/users/" + uid + "/templates/").get().then((templatesSnap) => {
      let templates = [];
      templatesSnap.forEach((template) => {
        templates.push(template.data())
      })
      this.templates = templates;
    })
  }



}
