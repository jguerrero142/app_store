import { Component, OnInit, EventEmitter, OnDestroy} from '@angular/core';

// Interfaces
import { Ticket, Pedido, Producto} from 'src/app/shared/models/index.models';

// Servicios
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MenuService } from '../../services/menu-service.service';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { StoreService } from '../../../../core/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-menu-pedido',
  templateUrl: './menu-pedido.component.html',
  styleUrls: ['./menu-pedido.component.css'],
})
export class MenuPedidoComponent implements OnInit, OnDestroy{
  //Variables Auth
  public id: number;
  public role: number;

  //Variables obetiene tickets
  public tickets: Producto[] = [];


  //Variable del valor total tickets
  public total: number;
  public texto: boolean = false;

  //Variable del componente
  public alert: boolean = false;

  constructor(
    public auth: AuthService,
    private menuServices: MenuService,
    public pedidoServices: PedidoService,
    public ticketsService: TicketsService,
    public storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.getTicket();
    this.getTotal();
    this.getAuth();
  }

  //Obtenemos los TICKETS
  getTicket(){
    this.menuServices.getTickets.subscribe(data =>{
      this.tickets = data;
      if(this.tickets){
        this.alert = false;
      }
      
    })
  }
   // Obtenemos el TOTAL
  getTotal(){
     this.menuServices.getTotal.subscribe(total => {
       if(total > 0){
        this.total = total;
        this.texto = true;
       }else{
        this.texto = false;
       }
     })
  }

  //Obtenemos datos del USUARIO
  getAuth() {
    this.storeService.getUser.subscribe((data) => {
      if (data) {
        this.id = data.id_user;
        this.role = data.role;
      }
    });
  }
  //Eliminamos el TICKET del arreglo
  deleteTicket(id: number){
    this.tickets.splice(id, 1);
    this.menuServices.setTotal(this.tickets);
  }

  afterClose(): void {
    this.alert = false;
}
ngOnDestroy(){}

}
