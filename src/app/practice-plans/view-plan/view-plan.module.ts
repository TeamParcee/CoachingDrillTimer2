import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPlanPageRoutingModule } from './view-plan-routing.module';

import { ViewPlanPage } from './view-plan.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'clean', 'align', 'underline', 'strike', 'link', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }, 'video', { size: ['normal', 'large'], }, 'clean'],

        ]
      }
    }),
    IonicModule,
    ViewPlanPageRoutingModule
  ],
  entryComponents: [],
  declarations: [ViewPlanPage]
})
export class ViewPlanPageModule { }
