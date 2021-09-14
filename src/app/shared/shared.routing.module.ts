import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Componentes Creados
import { MenuComponent } from './pages/menu/menu.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfigComponent } from './pages/config/config.component';
import { AdminComponent } from './pages/admin/admin.component';


// Auth0
import { CallbackComponent } from '../core/callback/callback.component';




const routes: Routes = [
    {
        path: '',
        children: [
     { path: 'Menu', component: MenuComponent },
     { path: 'Reserva', component: ReservaComponent  },
     { path: 'Perfil', component: PerfilComponent  },
     { path: 'Config', component: ConfigComponent  },
     { path: 'Admin', component: AdminComponent  },
     { path: 'callback', component: CallbackComponent },
     {  path: '**', redirectTo: 'Menu', pathMatch: 'full' },
     
     
     
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
export class SharedRoutingModule { }
