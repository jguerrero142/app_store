import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { User } from '../../models/User';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-total-pedido',
  templateUrl: './total-pedido.component.html',
  styleUrls: ['./total-pedido.component.css']
})
export class TotalPedidoComponent implements OnInit {


  id: any = [];
  user$: any = [];
  user: User;
  pedidos: any = [];
  idPedidos: any = [];
  idPedido: number;
  dataUser: any = [];

  // @Input() user: number;
  constructor(public auth: AuthService,
              public pedidoServices: PedidoService,
              public userServices: UsersService,) { 
    
  }
  
  ngOnInit(): void {
    
  }
  validarUser(){
    this.auth.userProfile$.subscribe((perfil: User) => {
    this.user$ = perfil;
        if(this.user$){
        // console.log(this.user$.sub);
        this.getUser();
        
     }
    })
  }
  getUser(){ 
    this.userServices.getUser(this.user$.sub)
    .subscribe(res => {
        this.user = res;
        this.id = this.user.id_user;
        console.log(this.id);
        this.getPedidos();
    })
  }
  getPedidos(){
    this.pedidoServices.getUserPedidos(this.id)
    .subscribe(resp => {
      this.pedidos = resp;
    })
  }

}
