import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { InventarioHomeComponent } from './components/inventario-home/inventario-home.component';
import { InventarioListComponent } from './components/inventario-list/inventario-list.component';
import { InventarioAlmacenComponent } from './components/inventario-almacen/inventario-almacen.component';

@NgModule({
  declarations: [
    InventarioHomeComponent,
    InventarioListComponent,
    InventarioAlmacenComponent,
  ],
  imports: [CommonModule, MaterialModule, nzDesingModule, NgxChartsModule],
  exports: [
    InventarioHomeComponent,
    InventarioListComponent,
    InventarioAlmacenComponent,
  ],
})
export class InventarioModule {}
