import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from 'src/app/shared/components/callback/callback.component';
import { MenuHomeComponent } from './components/menu-home/menu-home.component';


const routes: Routes = [
  {
    path: '', component: MenuHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
