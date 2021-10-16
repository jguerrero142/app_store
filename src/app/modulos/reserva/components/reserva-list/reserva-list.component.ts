import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/index.models';
import { Reserva } from 'src/app/shared/models/Reserva.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css'],
})
export class ReservaListComponent implements OnInit {
  //Variables Auth
  public role: number;
  public user: User;
  public id: any;

  public reservas: Reserva[] = [];

  // pedidos = [
  //   {
  //     active: true,
  //     name: 'This is panel header 1',
  //     childPanel: [
  //       {
  //         active: false,
  //         name: 'This is panel header 1-1'
  //       }
  //     ]
  //   },
  //   {
  //     active: false,
  //     name: 'This is panel header 2'
  //   },
  //   {
  //     active: false,
  //     name: 'This is panel header 3'
  //   }
  // ];

  constructor(
    public userServices: UsersService,
    public reservaServices: ReservaService
  ) {}

  ngOnInit(): void {
    this.userServices.getAuth();
    this.getAuth();
  }
  getAuth() {
    
  }

  getPedidosUser() {
    this.reservaServices
      .getUserPedidos(this.id)
      .subscribe((resp: Reserva[]) => {
        this.reservas = resp;
        console.log(this.reservas);
      });
  }
  getTickets(id: number) {
    console.log(id);
  }
}
