import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TipoProducto } from '../../../shared/models/Tipo-producto';
import { Producto } from '../../../shared/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  API_URI = 'http://localhost:3000/api';

  public tipo:string;
  public tipos: TipoProducto;
  constructor(private http: HttpClient) {

   }
   getTipos(){
    return this.http.get<TipoProducto[]>( `${this.API_URI}/producto/tipo/producto/`); 
  }
  
   getProductos(tipoProduct: number){
    return this.http.get<Producto[]>( `${this.API_URI}/producto/tipo/producto/${tipoProduct}`);
    // .pipe(
    //   map((resp: TipoProducto) => {
    //     this.tipo = resp.name_tipo;
    //     return this.tipo;
    //   })
    // )
  }


  
}
