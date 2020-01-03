import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PracticePlansPage } from './practice-plans.page';

const routes: Routes = [
  {
    path: '',
    component: PracticePlansPage
  },
  {
    path: 'add-plan',
    loadChildren: () => import('./add-plan/add-plan.module').then( m => m.AddPlanPageModule)
  },
  {
    path: 'view-plan',
    loadChildren: () => import('./view-plan/view-plan.module').then( m => m.ViewPlanPageModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module').then( m => m.TemplatesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticePlansPageRoutingModule {}
