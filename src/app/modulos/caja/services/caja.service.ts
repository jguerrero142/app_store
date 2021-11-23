import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreEffects } from '../../../core/effects/Store.effect';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private modal: NzModalService,
              private storeEffects: StoreEffects) {
   }

   showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>CONFIRMAR</i>',
      nzContent: '<b>Cerrar Caja</b>',
      nzOnOk: () => this.storeEffects.closeBox()
    });
  }
     
}
