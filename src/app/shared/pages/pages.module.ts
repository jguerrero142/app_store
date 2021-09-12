import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from '../../shared/shared.routing.module';

//Components
import { MenuComponent } from '../pages/menu/menu.component';
import { PedidosComponent } from '../pages/pedidos/pedidos.component';


//Angular Material
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [
    MenuComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
],
  exports: [
    MenuComponent,
    PedidosComponent
  ]
})
export class PagesModule { }
