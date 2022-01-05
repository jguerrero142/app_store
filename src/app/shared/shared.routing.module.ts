import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes Creados
import { MenuComponent } from './pages/menu/menu.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { CajaComponent } from './pages/caja/caja.component';
import { EmpresaComponent } from './pages/enterprise/enterprise.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { AdminComponent } from './pages/admin/admin.component';

// Auth0
import { CallbackComponent } from '../core/callback/callback.component';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'Menu', component: MenuComponent },
      {
        path: 'Reserva',
        component: ReservaComponent,
        canActivate: [AuthGuard],
      },
      { path: 'Caja', component: CajaComponent },
      { path: 'Empresa', component: EmpresaComponent },
      { path: 'Inventario', component: InventarioComponent },
      { path: 'Admin', component: AdminComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', redirectTo: 'Menu' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SharedRoutingModule {}
