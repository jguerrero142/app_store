import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    CallbackComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports:[
    CallbackComponent
  ]
})
export class CoreModule { }
