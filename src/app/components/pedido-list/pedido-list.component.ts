import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { User } from '../../models/User';
import { UsersService } from '../../services/user.service';
import { TicketsService } from '../../services/ticket.service';
import { Pedido } from '../../models/Pedido';



@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  // @Input() user: number;
  
  id: any = [];
  user$: any = [];
  user: any = [];
  pedidos: any = [];
  idPedidos: any = [];
  idPedido: number;
  dataUser: any = [];
  dataTicket: any = [];

  constructor(public auth: AuthService,
              public pedidoServices: PedidoService,
              public userServices: UsersService,
              public ticketsServices: TicketsService
    ) { 
      
    }

  ngOnInit(): void {
   this.validarUser();
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
  // userPedido(){
  //   this.userServices.getUserPedido(this.id)
  //   .subscribe(res => {
  //     this.dataUser = res;
  //     console.log(this.dataUser);
  //   })
      
  // }
  userTickets(idPedido: number){
    this.ticketsServices.userTickets(idPedido)
    .subscribe(res => {
     this.dataTicket = res;
     console.log(this.dataTicket);
    })
  }
  
 

}
