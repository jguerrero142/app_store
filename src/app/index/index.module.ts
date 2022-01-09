import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { SharedModule } from '../shared/shared.module';

//Modulos UI
import { nzDesingModule } from '../ant-desing.module';
import { MaterialModule } from '../material.module';


//Componentes
import { MenuComponent } from './components/menu/menu.component';
import { CartshopComponent } from './components/cartshop/cartshop.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { CardComponent } from './components/card/card.component';





@NgModule({
  declarations: [
    MenuComponent,
    CartshopComponent,
    CarrouselComponent,
    TabsComponent,
    CardComponent
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
