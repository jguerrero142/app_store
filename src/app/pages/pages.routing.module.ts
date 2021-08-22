import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CallbackComponent } from '../core/callback/callback.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
     { path: 'home', component: HomeComponent },
     { path: 'pedidos', component: PedidosComponent, canActivate: [ AuthGuard ] },
     { path: 'callback', component: CallbackComponent },
     { path: 'allpedido', component: WelcomeComponent },
     {  path: '**', redirectTo: 'home', pathMatch: 'full' },
      ]}
];

@NgModule({
  imports: 
  [
    RouterModule.forChild(routes)
  ],

  exports: 
  [
    RouterModule
  ]
})
export class PagesRoutingModule { }
