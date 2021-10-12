import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

//Modulos de la aplicacion
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Modulos Creados
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MenuModule } from './modulos/menu/menu.module';
import { ReservaModule } from './modulos/reserva/reserva.module';


// Modulos librearias
import { nzDesingModule } from './ant-desing.module';
import { MaterialModule } from './material.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';





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
    ReservaModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    nzDesingModule
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
