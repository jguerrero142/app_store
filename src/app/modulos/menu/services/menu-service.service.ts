import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Modelos
import { Producto, TipoProducto } from 'src/app/shared/models/index.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  API_URI = environment.wsUrl;

  public ticketAdd = new EventEmitter<boolean>();
  public tipo: string;
  public tipos: TipoProducto;

  constructor(private http: HttpClient) {}

  getTipos() {
    return this.http.get<TipoProducto[]>(
      `${this.API_URI}/producto/tipo/producto/`
    );
  }

  getProductos(tipoProduct: number) {
    return this.http.get<Producto[]>(
      `${this.API_URI}/producto/tipo/producto/${tipoProduct}`
    );
  }

  getMenu() {
    return this.http.get<Producto[]>(`${this.API_URI}/producto/store/menu`);
  }

  // Obtienes los ticket en estado true.
  getData(id: number) {
    return this.http.get(`${this.API_URI}/ticket/data/ticket/${id}`);
  }
  //Obtiene el valor total de los ticket en estado true.
  inData(id: number) {
    return this.http.get(`${this.API_URI}/ticket/data/total/${id}`);
  }

  //Obtiene los tickets de un pedido en especifico.
  userTickets(id: number) {
    return this.http.get(`${this.API_URI}/ticket/ticketPedido/${id}`);
  }

  putEstado(id: number, pedido: string) {
    return this.http.put(`${this.API_URI}/ticket/pedido/id/${id}`, pedido);
  }
}
