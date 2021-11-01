import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';
import { CajaHomeComponent } from './components/caja-home/caja-home.component';
import { CajaTitleComponent } from './components/caja-title/caja-title.component';
import { CajaListComponent } from './components/caja-list/caja-list.component';
import { CajaFacturaComponent } from './components/caja-factura/caja-factura.component';
import { CajaService } from './services/caja.service';



@NgModule({
  declarations: [
    
    CajaHomeComponent,
    CajaTitleComponent,
    CajaListComponent,
    CajaFacturaComponent
  ],
  imports: [CommonModule, MaterialModule, nzDesingModule],
  providers: [CajaService],
  exports: [

    CajaHomeComponent,
    CajaTitleComponent,
    CajaListComponent,
    CajaFacturaComponent
  ],
})
export class CajaModule {}
