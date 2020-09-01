import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { ChangeDatetimeComponent } from './practice-plans/view-plan/change-datetime/change-datetime.component';
import { AddActivityComponent } from './practice-plans/view-plan/add-activity/add-activity.component';
import { EditActivityComponent } from './practice-plans/view-plan/edit-activity/edit-activity.component';
import { ViewNotesPage } from './drill-timer/view-notes/view-notes.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { QuillModule } from 'ngx-quill';

var firebaseConfig = {
  apiKey: "AIzaSyA4u44PggAxUKQ0uYqAUDA30H2Vu4qc4FM",
  authDomain: "coachingdrilltimer-parcee.firebaseapp.com",
  databaseURL: "https://coachingdrilltimer-parcee.firebaseio.com",
  projectId: "coachingdrilltimer-parcee",
  storageBucket: "coachingdrilltimer-parcee.appspot.com",
  messagingSenderId: "1004076950227",
  appId: "1:1004076950227:web:3c9166be8b6853c0fb6a26",
  measurementId: "G-9EVH7Z8XYS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,
    ChangeDatetimeComponent,
    EditActivityComponent,
    ViewNotesPage,
    AddActivityComponent,],
  entryComponents: [
    ChangeDatetimeComponent,
    ViewNotesPage,
    EditActivityComponent,
    AddActivityComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'clean', 'align', 'underline', 'strike', 'link', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }, 'video', { size: ['normal', 'large'], }, 'clean'],

        ]
      }
    }),
    FormsModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    LocalNotifications,
    Vibration,
    BackgroundMode,
    Media,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
