import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ComponentsModule } from '../components/components.module';
import { IndexComponent } from './index/index.component';
// import { PagesRoutingModule } from './pages.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';




@NgModule({
  declarations: [
    HomeComponent,
    PedidosComponent,
    IndexComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ComponentsModule
    // PagesRoutingModule
  ],
  exports:[
    HomeComponent,
    PedidosComponent,
    IndexComponent,
    WelcomeComponent
  ]
})
export class PagesModule { }
