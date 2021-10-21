import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/index.models';
import { ReservaService } from '../../services/reserva.service';
import { StoreService } from '../../../../core/store.service';
import { Pedido } from '../../../../shared/models/Pedido.model';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-reserva-home',
  templateUrl: './reserva-home.component.html',
  styleUrls: ['./reserva-home.component.css'],
})
export class ReservaHomeComponent implements OnInit {
  
  //Variables Auth
  public role: number;
  public user: User;
  public id: any;

  constructor(public auth: AuthService, 
              public reservaServices: ReservaService,
               public storeServices: StoreService
  ) {}

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth() {
    this.storeServices.getUser.subscribe((d) => {
      if (d != null) {          
        this.user = d;
        this.id = d.id_user;
        this.role = d.role;
        this.storeServices.getUserPedidos();
      }
    });
  }
  

  
}
