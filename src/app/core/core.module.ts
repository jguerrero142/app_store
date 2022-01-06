import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';

// AngularMaterial
import { MaterialModule } from '../material.module';
import { nzDesingModule } from '../ant-desing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, nzDesingModule],
  providers: [StoreService],
  exports: [],
})
export class CoreModule {}
