import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/index.models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) {}
  getProductos() {
    return this.http.get<Producto[]>(`${this.API_URI}/producto`);
  }

  getProducto(id: string) {
    return this.http.get(`${this.API_URI}/producto/${id}`);
  }
  deleteProducto(id: string) {
    return this.http.delete(`${this.API_URI}/producto/${id}`);
  }
  saveProducto(producto: Producto) {
    return this.http.post(`${this.API_URI}/producto`, producto);
  }
  updateProducto(
    id: string | number,
    updateProducto: Producto
  ): Observable<Producto> {
    return this.http.put(`${this.API_URI}/producto/${id}`, updateProducto);
  }
}
