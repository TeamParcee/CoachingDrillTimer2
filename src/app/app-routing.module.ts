import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ConfirmEmailGuard } from './auth/confirm-email/confirm-email.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard, ConfirmEmailGuard]
  },
  {
    path: 'drill-timer',
    loadChildren: () => import('./drill-timer/drill-timer.module').then(m => m.DrillTimerPageModule), canActivate: [AuthGuard, ConfirmEmailGuard]
  },
  {
    path: 'practice-plans',
    loadChildren: () => import('./practice-plans/practice-plans.module').then(m => m.PracticePlansPageModule), canActivate: [AuthGuard, ConfirmEmailGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
