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



import { ProductoComponent } from './producto/producto.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    NavbarComponent,
    ProductoComponent,
    ProductListComponent
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
    MatTableModule
  ],
  exports:[
    NavbarComponent,
    ProductoComponent,
    ProductListComponent
  ]
})
export class ComponentsModule { }
