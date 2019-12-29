import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewNotesPageRoutingModule } from './view-notes-routing.module';

import { ViewNotesPage } from './view-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewNotesPageRoutingModule
  ],
  declarations: [ViewNotesPage]
})
export class ViewNotesPageModule {}
