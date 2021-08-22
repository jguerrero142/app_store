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

  tickets: any;
  tic: any;  
  
  new: any = [];
  totals: any = 0 ;
  pedido: Pedido;
  idpedido: any = [];
  ticket: any;
  texto:any;
  id: number;
  role: number;
  ticA: boolean = false;
  
  

  constructor(public auth: AuthService,
              public ticketsService: TicketsService,
              private pedidoService: PedidoService,
              public userServices: UsersService
              ) { 
                
              }

  ngOnInit(): void {
                
    this.getData();
    this.getRole();
    this.getId();
    this.getEvent();
                
  }
  getRole(){
    this.userServices.roleS
    .subscribe(res =>{
      this.role = res;   
    });
    
  }
  getId(){
    this.userServices.userSID
    .subscribe(res =>{
      this.id = res;
    })
  }
  getEvent(){
    this.ticketsService.ticketAdd
    .subscribe(res =>{
      this.ticA = res;
      this.getData();
    })
  }
  //Obtiene todos los tickets en estado true.
  getData(){
      this.ticketsService.getData()
      .subscribe((res: Ticket) => {
      this.tic = res;
            //Validamos el texto a mostrar
            if(this.tic.length > 0){
              this.texto = 1;
            }
            if(this.tic.length == 0){
              this.texto = 0;
            }
            this.inData();
          }),
          err => console.log(err)
  }
  //Obtiene el valor total de los tickets en true.
  inData(){      
      this.ticketsService.inData()
      .subscribe(res =>{
        this.totals = res;
      })
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
    .subscribe(res => {
    this.idpedido = res;
    this.putEstado();                
    })
                
  }  
  deleteTicket(id: number){
    this.ticketsService.deletTicket(id).
    subscribe(res => {
      this.getData();
    })
  }
  //Asignamos false a los tickets en true.
  putEstado(){
    const pedido = 'true';
    this.ticketsService.putEstado(this.idpedido.id, pedido)
      .subscribe(res=>{
        this.getData();
      })
  }

              

}
