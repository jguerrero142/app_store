import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';

import { TitleComponent } from './components/title/title.component';
import { ReservaHomeComponent } from './components/reserva-home/reserva-home.component';
import { ReservaFacturaComponent } from './components/reserva-factura/reserva-factura.component';
import { ReservaListComponent } from './components/reserva-list/reserva-list.component';
import { ReservaRoutingModule } from './reserva.routing.module';






@NgModule({
  declarations: [
    TitleComponent,
    ReservaHomeComponent,
    ReservaFacturaComponent,
    ReservaListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    nzDesingModule,
    ReservaRoutingModule
  ],
  exports:[
    TitleComponent,
    ReservaHomeComponent,
    ReservaFacturaComponent
  ]
})
export class ReservaModule { }
