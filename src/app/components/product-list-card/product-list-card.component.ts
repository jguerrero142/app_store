import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from '../../services/ticket.service';
import { Ticket } from '../../models/Ticket';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.css']
})
export class ProductListCardComponent implements OnInit {

  //Variables Auth 
  id: number;
  role: number;

  //Variables Grafica tickets Html  
  tickets: any;  
  //Variable del valor total tickets
  totals: any = 0 ;
  
  new: any = [];
  
  pedido: Pedido;
  idpedido: any = [];
  
  texto:any;
  
  
  
  

  constructor(public auth: AuthService,
              public ticketsService: TicketsService,
              private pedidoService: PedidoService,
              public userServices: UsersService
              ) {}

  ngOnInit(): void {
    this.getRole();
    this.getId();
    this.getEvent();
    this.getData();           
  }
  //Obtnemos el role del usuario
  getRole(){
    this.userServices.roleS
    .subscribe(res =>{this.role = res;});
  }
  //Obtenemos el Id del usuario
  getId(){
    this.userServices.userSID
    .subscribe(res =>{this.id = res;})
  }
  //Escuchamos el evento Agregar ticket
  getEvent(){
    this.ticketsService.ticketAdd
    .subscribe(res =>{this.getData();});}
   
  //Obtiene todos los tickets en estado true.
  getData(){
      this.ticketsService.getData(this.id)
      .subscribe((res: Ticket) => {this.tickets = res;
            //Validamos el texto a mostrar
            if(this.tickets.length > 0){this.texto = 1;}
            if(this.tickets.length == 0){this.texto = 0;}
            //Obtenemos el valor total de los tickets
            this.inData();
          }),err => console.log(err)}

  //Obtiene el valor total de los tickets en true.
  inData(){      
      this.ticketsService.inData(this.id).subscribe(res =>{this.totals = res;});
  }
  //Agrega el pedido al dar clic en el boton.
  newPedido(){
    const value = this.totals[0]; 
    this.pedido = {
      id_user: this.id,
      valor: value.Total,
    }
    console.log(this.pedido)
    this.pedidoService.savePedido(this.pedido)
    .subscribe(res => {this.idpedido = res;this.putEstado();});
    
  }  
  //Eliminamos el ticket
  deleteTicket(id: number){
    this.ticketsService.deletTicket(id)
    .subscribe(res => {this.getData();});
  }
  //Asignamos true a todos los pedidos en false.
  putEstado(){
    const pedido = 'true';
    this.ticketsService.putEstado(this.idpedido.id, pedido)
      .subscribe(res=>{this.getData();});
  }

              

}
