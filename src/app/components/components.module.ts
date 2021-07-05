import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';




import { ProductoComponent } from './producto/producto.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { TotalPedidoComponent } from './total-pedido/total-pedido.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';


@NgModule({
  declarations: [
    NavbarComponent,
    ProductoComponent,
    ProductListComponent,
    PedidoListComponent,
    TotalPedidoComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    CdkAccordionModule
    
  ],
  exports:[
    NavbarComponent,
    ProductoComponent,
    ProductListComponent,
    PedidoListComponent,
    TotalPedidoComponent
  ]
})
export class ComponentsModule { }
