import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';

import { TitleComponent } from './components/title/title.component';
import { ReservaListComponent } from './components/reserva-list/reserva-list.component';
import { ReservaFacturaComponent } from './components/reserva-factura/reserva-factura.component';






@NgModule({
  declarations: [
    TitleComponent,
    ReservaListComponent,
    ReservaFacturaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    nzDesingModule
  ],
  exports:[
    TitleComponent,
    ReservaListComponent,
    ReservaFacturaComponent
  ]
})
export class ReservaModule { }
