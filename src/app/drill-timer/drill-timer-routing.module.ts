import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrillTimerPage } from './drill-timer.page';

const routes: Routes = [
  {
    path: '',
    component: DrillTimerPage
  },
  {
    path: 'view-notes',
    loadChildren: () => import('./view-notes/view-notes.module').then( m => m.ViewNotesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrillTimerPageRoutingModule {}
