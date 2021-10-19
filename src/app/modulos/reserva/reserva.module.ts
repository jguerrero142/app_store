import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';

import { TitleComponent } from './components/title/title.component';
import { ReservaHomeComponent } from './components/reserva-home/reserva-home.component';
import { ReservaFacturaComponent } from './components/reserva-factura/reserva-factura.component';






@NgModule({
  declarations: [
    TitleComponent,
    ReservaHomeComponent,
    ReservaFacturaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    nzDesingModule
  ],
  exports:[
    TitleComponent,
    ReservaHomeComponent,
    ReservaFacturaComponent
  ]
})
export class ReservaModule { }
