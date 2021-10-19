import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/index.models';
import { ReservaService } from 'src/app/modulos/reserva/services/reserva.service';
import { StoreService } from '../../..//core/store.service';
import { Pedido } from 'src/app/shared/models/Pedido.model';
import { AuthService } from '../../..//core/auth/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  //Variables Auth
  public role: number;
  public user: User;
  public id: any;

  public valid: boolean = false;

  public reservas: Pedido[] = [];
 
  constructor(public auth: AuthService, 
    public reservaServices: ReservaService,
    public storeServices: StoreService) { }

  ngOnInit(): void {
    this.getAuth(); 
    }

    getAuth() {
      this.storeServices.getUser.subscribe((d) => {
        if (d != null) {          
          this.user = d;
          this.id = d.id_user;
          this.role = d.role;
          this.getPedidos(this.id);
          
        }
      });
    }

  getPedidos(id: number){
    this.storeServices.getUserPedidos(id);
    this.storeServices.getPedidos.subscribe(d=>{
      this.valid = true;   
      if(d.length > 0){
        this.reservas = d;
        
      }
      
    })
  }
  

}
