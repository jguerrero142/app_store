import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Pedido } from '../models/index.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) {}

  getPedidos() {
    return this.http.get(`${this.API_URI}/pedido`);
  }

  getPedido(id: string) {
    return this.http.get(`${this.API_URI}/pedido/${id}`);
  }

  deletPedido(id: string | number) {
    return this.http.delete(`${this.API_URI}/pedido/${id}`);
  }

  savePedido(pedido: Pedido) {
    return this.http.post<Pedido>(`${this.API_URI}/pedido`, pedido);
  }

  updatePedido(id: string | number, updatePedido: Pedido): Observable<Pedido> {
    return this.http.put(`${this.API_URI}/pedido/${id}`, updatePedido);
  }
}
