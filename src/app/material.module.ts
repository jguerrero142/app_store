import { NgModule } from '@angular/core';



// Navbar Material
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatDividerModule } from '@angular/material/divider';
//import { MatButtonModule } from '@angular/material/button';
// //Spinner Callback
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { FlexLayoutModule } from '@angular/flex-layout';

// import { MatTableModule } from '@angular/material/table';
// import {MatTabsModule} from '@angular/material/tabs';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { CdkAccordionModule } from '@angular/cdk/accordion';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
