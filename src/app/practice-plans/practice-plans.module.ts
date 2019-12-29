import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticePlansPageRoutingModule } from './practice-plans-routing.module';

import { PracticePlansPage } from './practice-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticePlansPageRoutingModule
  ],
  declarations: [PracticePlansPage]
})
export class PracticePlansPageModule {}
