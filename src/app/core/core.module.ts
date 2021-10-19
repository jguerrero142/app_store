import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';
import { StoreService } from './store.service';

// AngularMaterial
import { MaterialModule } from '../material.module';
import { nzDesingModule } from '../ant-desing.module';

@NgModule({
  declarations: [CallbackComponent],
  imports: [CommonModule, MaterialModule, nzDesingModule],
  providers: [StoreService],
  exports: [CallbackComponent],
})
export class CoreModule {}
