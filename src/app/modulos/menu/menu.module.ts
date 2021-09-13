import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './components/menu-list/menu-list.component';



@NgModule({
  declarations: [
    MenuListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MenuListComponent
  ]
})
export class MenuModule { }
