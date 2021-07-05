import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from '../../models/Pedido';

import { ProductosService } from 'src/app/services/productos.service';
import { UsersService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from 'src/app/services/ticket.service';




@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input() user: number;
  // @Output() ticke$ = new EventEmitter();

  ticket: any = [];
  productos: Pedido[] = [];

  constructor( public auth: AuthService,
               public userServices: UsersService,
               public ticketsService: TicketsService,
               public productosServices: ProductosService
               ) { }

  ngOnInit(): void { 
    this.productosServices.getProductos()
    .subscribe(res => {
      console.log(res);
      this.productos = res;
    },
    )
  }
  saveTicket(id: number){
    this.ticket = {
      user_ticket: this.user,
      producto: id,
          }
    this.ticketsService.saveTicket(this.ticket).
    subscribe(resp =>{
      console.log(resp);
    }
    )
  }

  

}
