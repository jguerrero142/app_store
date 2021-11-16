import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Modales y variables
import { Pedido,Producto, Factura,Ticket } from '../../shared/models/index.models';
import { environment } from 'src/environments/environment';

// Servicios
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { FacturarService } from 'src/app/shared/services/facturar.service';
import { StoreService } from '../store.service';




@Injectable({
  providedIn: 'root',
})
export class StoreEffects {

  // Obtiene el Id del USUARIO
  private user: number;

  // Obtiene los datos del pedido RESPONSE
  private  pedidoDate: Pedido;
  private  pedido: Pedido;
  private tickets: Producto[];
  private ticket$: Producto[];
   
   API_URI = environment.wsUrl;

  constructor( private storeServices: StoreService,
               private pedidoServices: PedidoService,
               private facturarServices: FacturarService,
               private http: HttpClient) {
               
                  this.storeServices.getStore.subscribe((data) => {
                    if(data.user.id_user != null){
                      this.user = data.user.id_user;
                    }
                    
                  });  
               }
      setPedidoUser(total: number, payload: Producto[], service: boolean){
        this.tickets = payload;
        const pedido = {
          id_user: this.user,
          valor: total,
          servicio: service
        }
        this.http.post<Pedido>(`${this.API_URI}/pedido/${this.user}`, pedido)
        .subscribe( res => {
          this.pedidoDate = res;
          if (this.pedidoDate.id_pedido != null){
          this.setTicketUser();
          this.pedidoDate.ticket = [];
          this.pedidoDate.ticket = this.tickets;        
          this.storeServices.sendPedido = this.pedidoDate;
        }
        });
      }

      setTicketUser(){
        console.log(this.tickets);
        this.tickets.map( item =>{
          const ticket = {
            user_ticket: this.user,
            Producto: item.id,
            id_pedido: this.pedidoDate.id_pedido,
          }
          this.http.post<Ticket[]>(`${this.API_URI}/ticket/`, ticket)
          .subscribe(d =>{})
        })
      }

      setPedido(total: number, payload: Producto[], service: boolean, client: number){
        this.ticket$ = payload;
        const pedido = {
          id_user: client,
          valor: total,
          servicio: service
        }
        this.http.post<Pedido>(`${this.API_URI}/pedido/${client}`, pedido)
        .subscribe( res => {
          this.pedido = res;
          if (this.pedido.id_pedido != null){
          this.setTicket(client);
          this.pedido.ticket = [];
          this.pedido.ticket = this.ticket$;        
          this.storeServices.setPedido = this.pedido;
        }
        });
      }

      setTicket(client: number){
        // console.log(this.tickets);
        this.ticket$.map( item =>{
          const ticket = {
            user_ticket: client,
            Producto: item.id,
            id_pedido: this.pedido.id_pedido,
          }
          this.http.post<Ticket[]>(`${this.API_URI}/ticket/`, ticket)
          .subscribe(d =>{})
        })
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