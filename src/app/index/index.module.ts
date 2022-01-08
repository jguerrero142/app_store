import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { nzDesingModule } from '../ant-desing.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule,
    nzDesingModule,
    MaterialModule
  ]
})
export class IndexModule { }
