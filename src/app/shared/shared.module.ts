import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';

//Angular Material
import { MaterialModule } from '../material.module';
import { nzDesingModule } from '../ant-desing.module';
import { NavComponent } from './components/nav/nav.component';
import { CartshopComponent } from './components/cartshop/cartshop.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardComponent } from './components/card/card/card.component';

@NgModule({
  declarations: [
    NavComponent,
    CartshopComponent,
    MenuComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    nzDesingModule,
  ],
  exports: [
    NavComponent,
    CartshopComponent,
    MenuComponent,
    CardComponent
  ],
})
export class SharedModule {}
