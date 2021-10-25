import { Injectable } from '@angular/core';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { Pedido,Producto } from '../../shared/models/index.models';
import { StoreService } from '../store.service';
import { Ticket } from 'src/app/shared/models/index.models';


@Injectable({
  providedIn: 'root',
})
export class StoreEffects {

   private pedidoId: number;
   private  pedidoDate: Pedido;
   
   
   private ticket: Producto[];
   private user: number;

  constructor( private storeServices: StoreService,
               private pedidoServices: PedidoService,
               private ticketServices: TicketsService) {
               
                  this.storeServices.getUser.subscribe((data) => {
                    if (data) {
                      this.user = data.id_user;
                    }
                  });
                  
                
               }

      sendPedidos(pedido: Pedido, payload: Producto[]){
       this.pedidoServices.savePedido(pedido).subscribe(res =>{
          this.pedidoDate = res
          this.pedidoDate.ticket = []
          this.sendTicket(payload)
       });
      }

      sendTicket(ticket:Producto[]){
          ticket.map(t => {            
          const ticke = {
            user_ticket: this.user,
            Producto: t.id,
            id_pedido: this.pedidoDate.id,
            }
            this.ticketServices.saveTicket(ticke)
            .subscribe(d=>{
                    d.map(date => {
                      this.pedidoDate.ticket.push(date)
                    })
            });
            
        });
        this.storeServices.sendPedido = this.pedidoDate
        
      }

      deletePedidos(index: number, pedido: number){
        this.storeServices.deletPedido = index
        this.pedidoServices.deletPedido(pedido).subscribe(d=>{
          
        });
      }

}