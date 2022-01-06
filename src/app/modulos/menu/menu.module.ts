import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';

import { MenuTodayComponent } from './components/menu-today/menu-today.component';
import { MenuPedidoComponent } from './components/menu-pedido/menu-pedido.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MenuHomeComponent } from './components/menu-home/menu-home.component';
import { ModalComponent } from './components/modal/modal.component';
import { MenuRoutingModule } from './menu.routing.module';

@NgModule({
  declarations: [
    MenuHomeComponent,
    MenuTodayComponent,
    MenuPedidoComponent,
    ProductCardComponent,
    ModalComponent,
  ],
  imports: [CommonModule, MaterialModule, nzDesingModule, MenuRoutingModule],
  exports: [
    MenuHomeComponent,
    MenuTodayComponent,
    MenuPedidoComponent,
    ProductCardComponent,
  ],
})
export class MenuModule {}
