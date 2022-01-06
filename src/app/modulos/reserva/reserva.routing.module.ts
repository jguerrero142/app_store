import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservaHomeComponent } from './components/reserva-home/reserva-home.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ReservaHomeComponent },
      { path: '**', redirectTo: 'Menu' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class ReservaRoutingModule {}
