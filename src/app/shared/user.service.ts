import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private helper: HelperService,

  ) {
    this.getUser();
  }



  firebaseUser;
  photoURL;
  cropImage;

  getUser = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        this.firebaseUser = firebaseUser;
        firebase.firestore().doc("/users/" + firebaseUser.uid).onSnapshot((user) => {
          return resolve(user.data())
        })
      })

    })

  }





 

  getUserFromUid(uid) {
    return new Promise((resolve) => {
      return firebase.firestore().doc("/users/" + uid).get().then((userSnap) => {
        return resolve(userSnap.data())
      })
    })
  }
  displayError(error) {
    this.helper.okAlert("There was a problem", error.message)
  }


}
