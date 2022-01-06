import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth0
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent
  }
  // {
  //   path: '',
  //   children: [
  //     { path: 'Menu', component: MenuComponent },
  //     {
  //       path: 'Reserva',
  //       component: ReservaComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     { path: 'Caja', component: CajaComponent },
  //     { path: 'Empresa', component: EmpresaComponent },
  //     { path: 'Inventario', component: InventarioComponent },
  //     { path: 'Admin', component: AdminComponent },
  //     { path: 'callback', component: CallbackComponent },
  //     { path: '**', redirectTo: 'Menu' },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SharedRoutingModule {}
