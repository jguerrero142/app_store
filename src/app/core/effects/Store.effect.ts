import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Modales y variables
import {
  Pedido,
  Producto,
  Factura,
  Ticket,
} from '../../modulos/shared/models/index.models';
import { environment } from 'src/app/shared/http/environments/environment';

// Servicios
import { PedidoService } from 'src/app/modulos/shared/services/pedido.service';
import { FacturarService } from 'src/app/modulos/shared/services/facturar.service';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreEffects {
  // Obtiene el Id del USUARIO
  private user: number;

  // Obtiene los datos del pedido RESPONSE
  private pedidoDate: Pedido;
  private pedido: Pedido;
  private tickets: Producto[];
  private ticket$: Producto[];
  public factura: Factura;
  public facturaRes: Factura;
  public facturaUser: Factura;
  public pedidoData: Pedido;

  public total: number;
  public metodo: number;

  API_URI = environment.wsUrl;

  constructor(
    private storeServices: StoreService,
    private pedidoServices: PedidoService,
    private facturarServices: FacturarService,
    private http: HttpClient
  ) {
    this.storeServices.getStore.subscribe((data) => {
      if (data.user.id_user != null) {
        this.user = data.user.id_user;
      }
    });
  }

  // Ingresa los pedidos De Usuario
  setPedidoUser(total: number, payload: Producto[], service: boolean) {
    this.tickets = payload;
    const pedido = {
      id_user: this.user,
      valor: total,
      servicio: service,
      user_update: this.user,
    };
    this.http
      .post<Pedido>(`${this.API_URI}/pedido/${this.user}`, pedido)
      .subscribe((res) => {
        this.pedidoDate = res;
        if (this.pedidoDate.id_pedido != null) {
          this.setTicketUser();
          this.pedidoDate.ticket = [];
          this.pedidoDate.ticket = this.tickets;
          this.storeServices.sendPedido = this.pedidoDate;
        }
      });
  }

  setTicketUser() {
    console.log(this.tickets);
    this.tickets.map((item) => {
      const ticket = {
        user_ticket: this.user,
        Producto: item.id,
        id_pedido: this.pedidoDate.id_pedido,
        producto_tipo: item.producto_tipo
      };
      this.http
        .post<Ticket[]>(`${this.API_URI}/ticket/`, ticket)
        .subscribe((d) => {});
    });
  }

  // Ingresa los pedidos de CAJA con ID cliente
  setPedido(
    total: number,
    payload: Producto[],
    service: boolean,
    client: number
  ) {
    this.ticket$ = payload;
    const pedido = {
      id_user: client,
      valor: total,
      servicio: service,
      user_update: this.user,
    };
    this.http
      .post<Pedido>(`${this.API_URI}/pedido/${client}`, pedido)
      .subscribe((res) => {
        this.pedido = res;
        if (this.pedido.id_pedido != null) {
          this.setTicket(client);
          this.pedido.ticket = [];
          this.pedido.ticket = this.ticket$;
          this.storeServices.setPedido = this.pedido;
        }
      });
  }

  setTicket(client: number) {
    // console.log(this.tickets);
    this.ticket$.map((item) => {
      const ticket = {
        user_ticket: client,
        Producto: item.id,
        id_pedido: this.pedido.id_pedido,
        producto_tipo: item.producto_tipo
      };
      this.http
        .post<Ticket[]>(`${this.API_URI}/ticket/`, ticket)
        .subscribe((d) => {});
    });
  }

  // Ingresa los Pedidos de CAJA
  setFacturar(
    total: number,
    payload: Producto[],
    service: boolean,
    metodo: number
  ) {
    (this.total = total), (this.metodo = metodo), (this.tickets = payload);
    const pedido = {
      id_user: this.user,
      valor: total,
      servicio: service,
      metodo_pago: metodo,
      estado_valor: 2,
      pedido_estado: 3,
      user_update: this.user,
    };
    this.http
      .post<Pedido>(`${this.API_URI}/pedido/${this.user}`, pedido)
      .subscribe((res) => {
        this.pedidoDate = res;
        if (this.pedidoDate.id_pedido != null) {
          this.setTicketUser();
          this.setFactura(this.pedidoDate.id_pedido, this.total, this.metodo);
          this.pedidoDate.ticket = [];
          this.pedidoDate.ticket = this.tickets;
          this.storeServices.sendPedido = this.pedidoDate;
        }
      });
  }

  deletePedidos(index: number, pedido: number) {
    this.storeServices.deletPedido = index;
    this.pedidoServices.deletPedido(pedido).subscribe((d) => {});
  }

  setFactura(id: number, total: number, metodo: number) {
    const factura = {
      id_user: this.user,
      id_pedido: id,
      valor: total,
      id_metodo: metodo,
      estado_valor: 2,
      estado_factura: 3,
      user_update: this.user,
    };
    return this.http
      .post<Factura>(`${this.API_URI}/factura/${this.user}`, factura)
      .subscribe((d) => {
        this.facturaRes = d;
        this.storeServices.setFactura = this.facturaRes;
      });
  }

  setFacturaUser(
    id: number,
    user: number,
    total: number,
    metodo: number,
    servicio: boolean
  ) {
    if (servicio == true && metodo == 0) {
      const alert = true;
      return alert;
    } else if (servicio == true) {
      this.updatePedido(id, 3, metodo, 2);
      this.facturaUser = {
        id_user: user,
        id_pedido: id,
        valor: total,
        id_metodo: metodo,
        estado_valor: 2,
        estado_factura: 3,
        user_update: this.user,
      };
    } else if (metodo > 0) {
      this.updatePedido(id, 3, metodo, 2);
      this.facturaUser = {
        id_user: user,
        id_pedido: id,
        valor: total,
        id_metodo: metodo,
        estado_valor: 2,
        estado_factura: 3,
        user_update: this.user,
      };
    } else {
      this.updatePedido(id, 3, metodo);
      this.facturaUser = {
        id_user: user,
        id_pedido: id,
        valor: total,
        estado_valor: 1,
        estado_factura: 3,
        user_update: this.user,
      };
    }
    return this.http
      .post<Factura>(`${this.API_URI}/factura/${user}`, this.facturaUser)
      .subscribe((d) => {
        this.facturaRes = d;
        this.storeServices.setFactura = this.facturaRes;
      });
  }

  updatePedido(
    id: number,
    est_factura: number,
    metodo: number,
    estado?: number
  ) {
    if (metodo == 0) {
      this.pedidoData = {
        pedido_estado: est_factura,
        user_update: this.user,
      };
    } else {
      this.pedidoData = {
        metodo_pago: metodo,
        estado_valor: estado,
        pedido_estado: est_factura,
        user_update: this.user,
      };
    }

    return this.http
      .put<Pedido>(`${this.API_URI}/pedido/${id}`, this.pedidoData)
      .subscribe((d) => {
        this.storeServices.updatePedido = d;
      });
  }

  closeBox(){
    return this.http.get(`${this.API_URI}/factura/closed/up`)
    .subscribe(d=> {
      const num = 4;
    this.storeServices.updateFactura = num;
    });
    
  }
}
