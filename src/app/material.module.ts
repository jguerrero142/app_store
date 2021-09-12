import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


// Navbar Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

//Spinner Callback
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';




@NgModule({
  imports: [
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,



    

    MatButtonModule,    
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    FlexLayoutModule,    
    MatTableModule,
    MatExpansionModule,
    CdkAccordionModule
    
    
    
    
  ],
  exports:[
    MatToolbarModule,
    BrowserAnimationsModule,


    MatButtonModule,    
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
