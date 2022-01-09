import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../../shared/http/api.service';
import { ApiTipo, ApiProducto } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

    
  constructor( private api: ApiService) {}

 

  getAllProducts(){
    return this.api.get<ApiProducto[]>('producto');
    // .subscribe( res => {
    //   this.producto = res;
    //   this.getProductsMenu();
    // });
  }

  // getProductsMenu(){
  //   const p = this.producto.filter(d => d.menu == true);
  //   this.menu = p;
  //   console.log(this.menu);
    
  // }

  getTipoProducts(){
    return this.api.get<ApiTipo[]>('producto/tipo/producto');
    // .subscribe( res => {
    //   this.tipos = res;
    //   console.log(this.tipos)
    // });
  }
}
