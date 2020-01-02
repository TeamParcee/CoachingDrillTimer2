import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'drill-timer',
        loadChildren: () => import("../drill-timer/drill-timer.module").then(m => m.DrillTimerPageModule)
      }, {
        path: 'practice-plans',
        loadChildren: () => import("../practice-plans/practice-plans.module").then(m => m.PracticePlansPageModule)
      }, {
        path: '',
        redirectTo: 'drill-timer'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'drill-timer'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
