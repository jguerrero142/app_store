import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';

// Componentes Creados
import { AdminComponent } from './pages/admin/admin.component';
import { ConfigComponent } from './pages/config/config.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


//Angular Material
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    AdminComponent,
    ConfigComponent,
    MenuComponent,
    PedidosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule    
  ],
  exports: [
    AdminComponent,
    ConfigComponent,
    MenuComponent,
    PedidosComponent,
    PerfilComponent
  ]
})
export class SharedModule { }
