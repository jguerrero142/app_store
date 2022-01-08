import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Modulos UI
import { nzDesingModule } from '../ant-desing.module';
import { MaterialModule } from '../material.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
//Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    nzDesingModule,
    MaterialModule,
  ],
  exports:[
    NavbarComponent,
    CallbackComponent
  ]
})
export class SharedModule { }
