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


import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';




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
    MaterialModule,

    ComponentsModule,
    PagesModule
     
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
