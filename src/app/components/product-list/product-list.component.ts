import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from '../../services/ticket.service';
import { Ticket } from '../../models/Ticket';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() user: number;
  

  tickets: any;
  tic: any;  
  id: any  = [];
  new: any = [];
  totals: any = 0 ;
  pedido: Pedido;
  idpedido: any = [];
  ticket: any;
  

  constructor(public auth: AuthService,
              public ticketsService: TicketsService,
              private pedidoService: PedidoService
              ) {}

  ngOnInit(): void {
    this.getData();
    this.newTicket();
  }
  getTickets(){
    this.ticketsService.getTickets().
    subscribe((resp: Ticket) =>{
      this.tickets = resp;
    })
  }
  getData(){
    this.ticketsService.getData()
    .subscribe((res: Ticket) => {
      this.tic = res;
      this.inData();   
    }),
    err => console.log(err)
  }
    inData(){      
      this.ticketsService.inData()
      .subscribe(res =>{
        this.totals = res;
        console.log(this.totals);
      })
    }
  newTicket(){
    this.ticketsService.newsTicket()
    .subscribe(res => {
      this.getData();
      this.inData();
    })
  }
  newPedido(){
    const value = this.totals[0]; 
    this.pedido = {
      id_user: this.user,
      valor: value.Total,
    }
    console.log(this.pedido)
    this.pedidoService.savePedido(this.pedido)
    .subscribe(res => {
     this.idpedido = res;
    this.AddPedido();
    })
    
  }  
  deleteTicket(id: number){
    this.ticketsService.deletTicket(id).
    subscribe(res => {
      this.getData();
    })
  }
  AddPedido(){
    const pedido = 'true';
    this.ticketsService.AddPedido(this.idpedido.id, pedido)
     .subscribe(res=>{
       this.getData();
     })
  }
  
          
}