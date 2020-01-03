import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplatesPage } from './templates.page';

const routes: Routes = [
  {
    path: '',
    component: TemplatesPage
  },
  {
    path: 'template',
    loadChildren: () => import('./template/template.module').then( m => m.TemplatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesPageRoutingModule {}
