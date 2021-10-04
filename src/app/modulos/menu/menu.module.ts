import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuTodayComponent } from './components/menu-today/menu-today.component';
import { MenuPedidoComponent } from './components/menu-pedido/menu-pedido.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { nzDesingModule } from '../../ant-desing.module';




@NgModule({
  declarations: [
    MenuListComponent,
    MenuTodayComponent,
    MenuPedidoComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    nzDesingModule
  ],
  exports:[
    MenuListComponent,
    MenuTodayComponent,
    MenuPedidoComponent,
    ProductCardComponent
  ]
})
export class MenuModule { }
