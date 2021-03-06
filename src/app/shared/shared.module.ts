import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';

//Modulos Creados
import { MenuModule } from '../modulos/menu/menu.module';

// Componentes Creados
import { AdminComponent } from './pages/admin/admin.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { EmpresaComponent } from './pages/enterprise/enterprise.component';


//Angular Material
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { nzDesingModule } from '../ant-desing.module';
import { ReservaModule } from '../modulos/reserva/reserva.module';
import { CajaModule } from '../modulos/caja/caja.module';
import { CajaComponent } from './pages/caja/caja.component';
import { SearchPipe } from './pipe/search.pipe';





@NgModule({
  declarations: [
    AdminComponent,
    InventarioComponent,
    MenuComponent,
    CajaComponent,
    ReservaComponent,
    EmpresaComponent,
    NavbarComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MenuModule,
    ReservaModule,
    CajaModule,
    MaterialModule,
    nzDesingModule
  ],
  exports: [
    AdminComponent,
    InventarioComponent,
    MenuComponent,
    CajaComponent,
    ReservaComponent,
    EmpresaComponent,
    NavbarComponent,
    SearchPipe
  ]
})
export class SharedModule { }
