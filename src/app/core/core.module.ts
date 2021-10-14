import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';
import { CoreService } from './core.service';

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
  providers:[
    CoreService
  ],
  exports:[
    CallbackComponent
  ]
})
export class CoreModule { }
