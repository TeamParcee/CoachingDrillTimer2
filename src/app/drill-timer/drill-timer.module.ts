import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrillTimerPageRoutingModule } from './drill-timer-routing.module';

import { DrillTimerPage } from './drill-timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrillTimerPageRoutingModule
  ],
  declarations: [DrillTimerPage]
})
export class DrillTimerPageModule {}
