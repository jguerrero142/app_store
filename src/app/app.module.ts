import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Modulos Creados
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { MenuModule } from './modulos/menu/menu.module';

// //Sockets
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { environment } from '../environments/environment';
// const config: SocketIoConfig = { url: environment.wsUrl, options: {} };
  // SocketIoModule.forRoot(config)

registerLocaleData(es);





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MenuModule,
    MaterialModule
     
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
