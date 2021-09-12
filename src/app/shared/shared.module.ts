import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';

//Components
import { MenuComponent } from './pages/menu/menu.component';
import { PedidosComponent } from '../pages/pedidos/pedidos.component';


//Angular Material
import { MaterialModule } from '../material.module';
import { PagesModule } from '../pages/pages.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    PagesModule
    
  ],
  exports: [
    
  ]
})
export class SharedModule { }
