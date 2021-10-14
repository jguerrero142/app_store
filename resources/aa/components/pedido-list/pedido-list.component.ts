import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { User } from '../../models/User';
import { UsersService } from '../../services/user.service';
import { TicketsService } from '../../services/ticket.service';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  
   
  pedidos: any = [];
  idPedidos: any = [];
  idPedido: number;
  dataUser: any = [];
  dataTicket: any = [];
  Iduser: any;
  id: any;
  role: number;
  user: User[] = []
  

  constructor(public auth: AuthService,
              public pedidoServices: PedidoService,
              public userServices: UsersService,
              public ticketsServices: TicketsService
    ) { 
      }
    
  ngOnInit(): void {
    this.getId();
    this.getRole();
  }
  //Obtenemos el role del usuario.
  getRole(){
    this.userServices.roleS
    .subscribe(res =>{
      this.role = res;;
    })
  } 
  //Obtenemos el Id del usuario.
  getId(){
    this.userServices.userSID
    .subscribe(res =>{
      this.id = res;
      this.getPedidos(this.id);
    });
  }
  //Obtiene todos los pedidos del usuario.  
  getPedidos(id: number){  
    this.pedidoServices.getUserPedidos(id)
    .subscribe(resp => {
      this.pedidos = resp;
      console.log(this.pedidos);
    });
  
  }
  //Consultamos los tickets por pedido con ID
  userTickets(idPedido: number){
    this.ticketsServices.userTickets(idPedido)
    .subscribe(res => {
     this.dataTicket = res;
     console.log(this.dataTicket);
    })
  }
  //Eliminamos los pedidos con numero de pedido y numero de usuario.
  deletePedido(id:number, idu: number){
    console.log(id);
    this.pedidoServices.deletPedido(id)
    .subscribe(res => {
      this.pedidoServices.getUserPedidos(idu)
     .subscribe(resp => {this.pedidos = resp;})
    
  })
}
}
