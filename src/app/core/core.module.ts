import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';

// AngularMaterial
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    CallbackComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    CallbackComponent
  ]
})
export class CoreModule { }
