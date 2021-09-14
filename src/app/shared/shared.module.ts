import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';

//Modulos Creados
import { MenuModule } from '../modulos/menu/menu.module';

// Componentes Creados
import { AdminComponent } from './pages/admin/admin.component';
import { ConfigComponent } from './pages/config/config.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


//Angular Material
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [
    AdminComponent,
    ConfigComponent,
    MenuComponent,
    ReservaComponent,
    PerfilComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MenuModule,
    MaterialModule    
  ],
  exports: [
    AdminComponent,
    ConfigComponent,
    MenuComponent,
    ReservaComponent,
    PerfilComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
