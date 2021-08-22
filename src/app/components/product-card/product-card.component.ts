import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';

import { UsersService } from '../../services/user.service';
import { TicketsService } from 'src/app/services/ticket.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Pedido } from '../../models/Pedido';
import { User } from '../../models/User';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

   
  //Variables Auth
  role: number;
  user: any;
  
  //Variables del componente
  ticket: any = [];
  productos: Pedido[] = [];
  

  constructor(public auth: AuthService,
              public pedidoServices: PedidoService,
              public userServices: UsersService,
              public ticketsService: TicketsService,
              public productosServices: ProductosService
    ) {}

  ngOnInit(): void {
    this.getProductos();
    this.getUser();
    this.getRole();
    
  }
  //Obtenemos todos los productos.
  getProductos(){
    this.productosServices.getProductos()
    .subscribe(res => {
      this.productos = res;
      
    });
  }
  //Obtenemos el usuario.
  getUser(){
    this.userServices.userSID
    .subscribe(res => {
      this.user = res;
    })
  }
  //Obtenemos el role.
  getRole(){
    this.userServices.roleS
    .subscribe(res =>{
      this.role = res;
    })
  }
  //Guardamos el ticket al dar clic en anadir
  saveTicket(id: number){
    this.ticket = {
              user_ticket: this.user,
              producto: id,
          }    
    this.ticketsService.saveTicket(this.ticket).
    subscribe(resp =>{
    this.ticketsService.ticketAdd.emit(true);
    });
  }


  //Editamos el producto
  editProduct(id: number){
    this.ticket = {
              user_ticket: this.user,
              producto: id,
          }    
    this.ticketsService.saveTicket(this.ticket).
    subscribe(resp =>{ });
  }
  

}
