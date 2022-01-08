import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Pedido } from '../models/index.models';
import { environment } from 'src/environments/environment';
import { Factura } from '../models/Factura.model';

@Injectable({
  providedIn: 'root',
})
export class FacturarService {
  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) {console.log("carshop")}

  getPedidos() {
    return this.http.get(`${this.API_URI}/pedido`);
  }

  getPedido(id: string) {
    return this.http.get(`${this.API_URI}/pedido/${id}`);
  }

  deletPedido(id: string | number) {
    return this.http.delete(`${this.API_URI}/pedido/${id}`);
  }

  saveFactura(factura: Factura) {
    return this.http.post<Factura>(`${this.API_URI}/factura`, factura);
  }

  updatePedido(id: string | number, updatePedido: Pedido): Observable<Pedido> {
    return this.http.put(`${this.API_URI}/pedido/${id}`, updatePedido);
  }
}
