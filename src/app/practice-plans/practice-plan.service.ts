import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { FireStoreService } from '../shared/firestore.service';

export class Plan {
    constructor(
        public id?: string,
        public date?: string,
        public startTime?: string,
        public endTime?: string,
        public duration?: number,
        public activitiesCount?: number,
        public startTimestamp?: number,
        public endTimestamp?: number,
        public template?: string,
    ) { }
}

export class Activity {
    constructor(
        public id?: string,
        public date?: string,
        public startTime?: string,
        public endTime?: string,
        public order?: number,
        public name?: string,
        public notes?: string,
        public duration?: number,
        public showAlert?: boolean,
        public startTimestamp?: any,
    ) { }
}
@Injectable({
    providedIn: 'root'
})
export class PlanService {

    constructor(
        private firestoreService: FireStoreService,
    ) { }

    addPlan(plan: Plan) {
        let uid = localStorage.getItem("uid");
        return new Promise((resolve, reject) => {
            this.firestoreService.addDocument("/users/" + uid + "/plans", { ...plan }).then((planId) => {
                if (plan.template != "No Template") {
                    firebase.firestore().collection("/users/" + uid + "/templates/" + plan.template + "/activities").get().then((activitiesSnap) => {
                        activitiesSnap.forEach((activity) => {
                            this.firestoreService.addDocument("/users/" + uid + "/plans/" + planId + "/activities", { ...activity.data() })
                        })
                        let plan: Plan = { id: planId as string }
                        this.updateActivityCount(plan)
                    })
                }
                return resolve()
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    deletePlan(plan: Plan) {
        let uid = localStorage.getItem("uid");
        return new Promise((resolve, reject) => {
            this.firestoreService.deleteDocument("/users/" + uid + "/plans/" + plan.id).then(() => {
                return resolve()
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    deleteTemplate(template: Plan) {
        let uid = localStorage.getItem("uid");
        return new Promise((resolve, reject) => {
            this.firestoreService.deleteDocument("/users/" + uid + "/templates/" + template.id).then(() => {
                return resolve()
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    updateActivityCount(plan: Plan) {
        let uid = localStorage.getItem("uid");
        firebase.firestore().doc("/users/" + uid + "/plans/" + plan.id).get().then(async (planSnap) => {
            let activitesSnap = await planSnap.ref.collection("activities").get();
            planSnap.ref.update({ activitiesCount: activitesSnap.size })
        })
    }

    updateActivityCountTemplate(template: Plan) {
        let uid = localStorage.getItem("uid");
        firebase.firestore().doc("/users/" + uid + "/templates/" + template.id).get().then(async (planSnap) => {
            let activitesSnap = await planSnap.ref.collection("activities").get();
            planSnap.ref.update({ activitiesCount: activitesSnap.size })
        })
    }
}
