import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { SharedModule } from '../shared/shared.module';

//Modulos UI
import { nzDesingModule } from '../ant-desing.module';
import { MaterialModule } from '../material.module';


//Componentes
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';





@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    nzDesingModule,
    MaterialModule,
    IndexRoutingModule,
    SharedModule,
    
  ]
})
export class IndexModule { }
