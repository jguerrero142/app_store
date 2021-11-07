import { Injectable } from '@angular/core';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { Pedido,Producto } from '../../shared/models/index.models';
import { StoreService } from '../store.service';
import { Ticket } from 'src/app/shared/models/index.models';
import { FacturarService } from 'src/app/shared/services/facturar.service';
import { Factura } from '../../shared/models/Factura.model';


@Injectable({
  providedIn: 'root',
})
export class StoreEffects {

   private pedidoId: number;
   private  pedidoDate: Pedido = new Pedido;
   private factura: Factura;
   
   
   private ticket: Ticket;
   private user: number;

  constructor( private storeServices: StoreService,
               private pedidoServices: PedidoService,
               private ticketServices: TicketsService,
               private facturarServices: FacturarService) {
               
                  this.storeServices.getStore.subscribe((data) => {
                    if (data) {
                      this.user = data.user.id_user;
                    }
                  });
                  
                
               }
      sendPedidos(pedido: Pedido, payload: Producto[], user?: number){
      this.pedidoServices.savePedido(pedido).subscribe(res =>{
        this.pedidoDate = res;
        this.pedidoDate.ticket = [];
        this.sendTicket(payload, user);
      });
      }


      sendTicket(ticket:Producto[], user?: number){
          ticket.map(t => {
            if(user > 0){
              this.ticket = {
                user_ticket: user,
                Producto: t.id,
                id_pedido: this.pedidoDate.id,
                }
            }else{
              this.ticket = {
                user_ticket: this.user,
                Producto: t.id,
                id_pedido: this.pedidoDate.id,
                }
            }
            this.ticketServices.saveTicket(this.ticket)
            .subscribe(d=>{
                    d.map(date => {
                      this.pedidoDate.ticket.push(date)
                    })
            });
            
        });
        console.log(this.pedidoDate)
        this.storeServices.sendPedido = this.pedidoDate
        
      }

      deletePedidos(index: number, pedido: number){
        this.storeServices.deletPedido = index
        this.pedidoServices.deletPedido(pedido).subscribe(d=>{
          
        });
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