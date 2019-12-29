import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlanPage } from './add-plan.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlanPageRoutingModule {}
