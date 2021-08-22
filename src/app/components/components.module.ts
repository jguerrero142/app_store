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
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';





import { ProductoComponent } from './producto/producto.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { TotalPedidoComponent } from './total-pedido/total-pedido.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListCardComponent } from './product-list-card/product-list-card.component';
import { AllpedidoComponent } from './allpedido/allpedido.component';
import { HistorialComponent } from './historial/historial.component';


@NgModule({
  declarations: [
    NavbarComponent,
    ProductoComponent,
    ProductListComponent,
    PedidoListComponent,
    TotalPedidoComponent,
    ProductCardComponent,
    ProductListCardComponent,
    AllpedidoComponent,
    HistorialComponent
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
    CdkAccordionModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzCardModule
    
  ],
  exports:[
    NavbarComponent,
    ProductoComponent,
    ProductListComponent,
    PedidoListComponent,
    TotalPedidoComponent,
    AllpedidoComponent,
    HistorialComponent
  ]
})
export class ComponentsModule { }
