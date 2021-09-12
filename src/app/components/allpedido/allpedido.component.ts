import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { User } from '../../models/User';
import { UsersService } from '../../services/user.service';
import { TicketsService } from '../../services/ticket.service';

@Component({
  selector: 'app-allpedido',
  templateUrl: './allpedido.component.html',
  styleUrls: ['./allpedido.component.css']
})
export class AllpedidoComponent implements OnInit {
  //Variable Auth0
  role: number;
  user: any;
  id: any;

  pedidos: any = [];
  idPedidos: any = [];
  idPedido: number;
  dataUser: any = [];
  dataTicket: any = [];

  constructor(public auth: AuthService,
              public pedidoServices: PedidoService,
              public userServices: UsersService,
              public ticketsServices: TicketsService
              ) { }

 ngOnInit(): void {
  this.getId();
  this.getRole();
  
  }
 
  getRole(){
    this.userServices.roleS
    .subscribe(res =>{
      this.role = res;
      console.log(this.role);
    })
  } 
  getId(){
    this.userServices.userSID
    .subscribe(res =>{
      this.id = res;
      console.log(this.id);
      this.getPedidos();
    })
  }   
  getPedidos(){
    this.pedidoServices.getPedidos()
    .subscribe(resp => {
      this.pedidos = resp;
    })
  }

  userTickets(idPedido: number){
    this.ticketsServices.userTickets(idPedido)
    .subscribe(res => {
     this.dataTicket = res;
     console.log(this.dataTicket);
    })
  }
  deletePedido(id:number){
    console.log(id);
    this.pedidoServices.deletPedido(id)
    .subscribe(res => {
      this.getPedidos();
    })
  }

}
