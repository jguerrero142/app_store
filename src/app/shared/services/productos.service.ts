import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Producto } from '../models/Producto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }
    getProductos(){
      return this.http.get<Producto[]>( `${this.API_URI}/producto`);
    }
    
    getProducto(id: string){
      return this.http.get(`${this.API_URI}/producto/${id}`)
    }
    deleteProducto(id: string){
      return this.http.delete(`${this.API_URI}/producto/${id}`);
    }
    saveProducto(producto: Producto){
      return this.http.post(`${this.API_URI}/producto`, producto);
    }
    updateProducto(id: string | number, updateProducto: Producto):Observable<Producto>{
      return this.http.put(`${this.API_URI}/producto/${id}`, updateProducto);
    }
    
}
