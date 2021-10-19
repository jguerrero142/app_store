import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/index.models';
import { ReservaService } from '../../services/reserva.service';
import { StoreService } from '../../../../core/store.service';
import { Pedido } from '../../../../shared/models/Pedido.model';
import { AuthService } from '../../../../core/auth/auth.service';

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

  public valid: boolean = false;

  public reservas: Pedido[] = [];

  constructor(
    public auth: AuthService,
    public reservaServices: ReservaService,
    public storeServices: StoreService
  ) {}

  ngOnInit(): void {
    this.getAuth();
    this.getPedidos();
  }

  getAuth() {
    this.storeServices.getUser.subscribe((d) => {
      if (d != null) {
        this.user = d;
        this.id = d.id_user;
        this.role = d.role;
      }
    });
  }
  getPedidos() {
    this.storeServices.getPedidos.subscribe((d) => {
      if (d.length > 0) {
        this.reservas = d;
        this.valid = true;
      }
    });
  }
}
