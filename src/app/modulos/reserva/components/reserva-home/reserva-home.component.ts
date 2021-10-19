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

  public reservas: Pedido[] = [];

  constructor(public auth: AuthService, 
              public reservaServices: ReservaService,
               public storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getAuth();
    this.getPedidos();    
  }
  getAuth() {
    this.storeService.getUser.subscribe((d) => {
      if (d.id_user > 0 ) {          
        this.user = d;
        this.id = d.id_user;
        this.role = d.role;
        
      }
    });
  }
  getPedidos(){
    this.reservaServices.getPedidos.subscribe(d=>{
      if(d.length > 0){
        this.reservas = d
        console.log(this.reservas)
      }
      
    })
  }

  
}
