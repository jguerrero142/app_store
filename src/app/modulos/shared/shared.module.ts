import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Material
import { MaterialModule } from '../../material.module';
import { nzDesingModule } from '../../ant-desing.module';
import { NavComponent } from './components/nav/nav.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardComponent } from './components/card/card/card.component';

@NgModule({
  declarations: [
    NavComponent,
    MenuComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
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
