import { Injectable } from '@angular/core';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { Pedido,Producto } from '../../shared/models/index.models';
import { StoreService } from '../store.service';
import { Ticket } from 'src/app/shared/models/index.models';
import { FacturarService } from 'src/app/shared/services/facturar.service';
import { Factura } from '../../shared/models/Factura.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class StoreEffects {

  // Obtiene el Id del USUARIO
  private user: number;

  // Obtiene los datos del pedido RESPONSE
  private  pedidoDate: Pedido;
  private tickets: Producto[] = [];
   
   API_URI = environment.wsUrl;

  constructor( private storeServices: StoreService,
               private pedidoServices: PedidoService,
               private ticketServices: TicketsService,
               private facturarServices: FacturarService,
               private http: HttpClient) {
               
                  this.storeServices.getStore.subscribe((data) => {
                    this.user = data.user.id_user;
                  });
                  this.pedidoDate.ticket = [];
                  
                
               }
      setPedidoUser(pedido: Pedido, payload: Producto[]){
        this.http.post<Pedido>(`${this.API_URI}/pedido/${this.user}`, pedido)
        .subscribe( res => { 
           this.pedidoDate = res;
        });
          
          this.pedidoDate.ticket = payload;
          console.log(this.pedidoDate);
          this.storeServices.sendPedido = this.pedidoDate
      }

      

      setTicketUser(){
        this.tickets.forEach((item, index)=>{
          const ticket = {
            user_ticket: this.user,
            Producto: item.id
          }
          this.http.post<Ticket[]>(`${this.API_URI}/ticket/${this.user}`, ticket)
          .subscribe(d => {
            if(d.length> 0){
              console.log(d)}
            })         
            
        })
        
        // this.http.post(`${this.API_URI}/ticket/${this.user}`, ticket)
        // .subscribe(d => {console.log(d)})


          // ticket.forEach((item, index) =>{
          //   const ticket = {
          //     user_ticket: this.user,
          //     Producto: item.id
          //   }
          // this.http.post<Ticket>(`${this.API_URI}/ticket/user/${id}`, ticket)
          // .subscribe(date => {
          //   console.log(date)
                    // if(date != null){
                    //   this.pedidoDate.ticket.push(date);
                    //   console.log(this.pedidoDate)
                    // }
          // });
            
          // });
        
        // this.storeServices.sendPedido = this.pedidoDate
        
        //   ticket.map(t => {
        //     this.ticket = {
        //         user_ticket: this.user,
        //         Producto: t.id,
        //         id_pedido: this.pedidoDate.id,
        //     }
        //     this.ticketServices.saveTicket(this.ticket)
        //     .subscribe(d=>{
              
        //             d.map(date => {
        //               this.pedidoDate.ticket.push(date)
        //             })
        //     });
            
        // });
        // this.storeServices.sendPedido = this.pedidoDate
        
      }

      deletePedidos(index: number, pedido: number){
        this.storeServices.deletPedido = index
        this.pedidoServices.deletPedido(pedido).subscribe(d=>{});
      }

      setFactura(factura: Factura){
        console.log(factura)
          // this.factura = {
          //   id_user: factura.id_user,
          //   id_pedido: factura.id_pedido,
          //   valor: factura.valor,
          //   observacion: factura.observacion,
          // // }
          // console.log(this.factura)
          this.facturarServices.saveFactura(factura).subscribe(d =>{console.log(d)});
      }

}