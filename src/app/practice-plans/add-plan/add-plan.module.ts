import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlanPageRoutingModule } from './add-plan-routing.module';

import { AddPlanPage } from './add-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlanPageRoutingModule
  ],
  declarations: [AddPlanPage]
})
export class AddPlanPageModule {}
