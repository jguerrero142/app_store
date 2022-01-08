import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CallbackComponent } from './modulos/shared/components/callback/callback.component';
// import { MenuComponent } from './modulos/shared/components/menu/menu.component';
// import { ReservaHomeComponent } from './modulos/reserva/components/reserva-home/reserva-home.component';

// loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
const routes: Routes = [
  { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  { path: '**', redirectTo: 'index' },
  
  
  // { path: 'Menu', component: MenuComponent },
  // { path: 'callback', component: CallbackComponent },
  // { path:'Index', 
  // loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
  //  {
  //   path: 'Reserva', component: ReservaHomeComponent
  // }
];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(routes)
  ],
  exports: 
  [
    RouterModule
  ]
})
export class AppRoutingModule { }

