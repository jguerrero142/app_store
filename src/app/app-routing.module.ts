import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './shared/components/callback/callback.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ReservaHomeComponent } from './modulos/reserva/components/reserva-home/reserva-home.component';

// loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Menu' },
  { path: 'Menu', component: MenuComponent },
  { path: 'callback', component: CallbackComponent },
  // { path:'Menu', 
  //   loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
   {
    path: 'Reserva', component: ReservaHomeComponent
  }
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

