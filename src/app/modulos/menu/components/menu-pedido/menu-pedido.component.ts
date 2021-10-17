import { Component, OnInit, EventEmitter } from '@angular/core';

// Interfaces
import { Ticket, Pedido, Producto} from 'src/app/shared/models/index.models';

// Servicios
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MenuService } from '../../services/menu-service.service';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { CoreService } from '../../../../core/core.service';
@Component({
  selector: 'app-menu-pedido',
  templateUrl: './menu-pedido.component.html',
  styleUrls: ['./menu-pedido.component.css'],
})
export class MenuPedidoComponent implements OnInit {
  //Variables Auth
  public id: number;
  public role: number;

  //Variables Grafica tickets Html
  public tickets: any;
  //Variable del valor total tickets
  public totals: any = 0;

  public pedido: Pedido;
  public idpedido: any = [];
  public texto: any;
  public ticket$: Producto[] = [];

  constructor(
    public auth: AuthService,
    private menuServices: MenuService,
    public pedidoServices: PedidoService,
    public ticketsService: TicketsService,
    public coreService: CoreService
  ) {
    this.texto = 0;
  }

  ngOnInit(): void {
    this.getEvent();
    this.getTicket();
  }

  getTicket(){
    this.menuServices.getTickets.subscribe(data =>{
      this.ticket$ = data;
      console.log(this.ticket$)
    })
  }




  //Obtnemos el role del usuario
  getAuth() {
    this.coreService.getUser.subscribe((data) => {
      if (data) {
        this.id = data.id_user;
        this.role = data.role;
      }
    });
  }
  //Escuchamos el evento Agregar ticket
  getEvent() {
    this.menuServices.ticketAdd.subscribe((res) => {
      this.getAuth();
      this.getData();
    });
  }

  //Obtiene todos los tickets en estado true.
  getData() {
    this.menuServices.getData(this.id).subscribe((res: Ticket) => {
      this.tickets = res;
      //Validamos el texto a mostrar
      if (this.tickets.length > 0) {
        this.texto = 1;
      }
      if (this.tickets.length == 0) {
        this.texto = 0;
      }
      //Obtenemos el valor total de los tickets
      this.inTotal();
    }),
      (err) => console.log(err);
  }

  //Obtiene el valor total de los tickets en true.
  inTotal() {
    this.menuServices.inData(this.id).subscribe((res) => {
      this.totals = res;
    });
  }
  //Agrega el pedido al dar clic en el boton.
  newPedido() {
    const value = this.totals[0];
    this.pedido = {
      id_user: this.id,
      valor: value.Total,
    };
    console.log(this.pedido);
    this.pedidoServices.savePedido(this.pedido).subscribe((res) => {
      this.idpedido = res;
      this.putEstado();
    });
  }
  //Eliminamos el ticket
  deleteTicket(id: number) {
    this.ticketsService.deletTicket(id).subscribe((res) => {
      this.getData();
    });
  }
  //Asignamos true a todos los pedidos en false.
  putEstado() {
    const pedido = 'true';
    this.menuServices.putEstado(this.idpedido.id, pedido).subscribe((res) => {
      this.getData();
    });
  }
}
