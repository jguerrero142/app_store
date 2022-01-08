import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiTipoPro, ApiProducto, Menu } from 'src/app/modulos/shared/interface/index';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public tipos: ApiTipoPro[] = [];
  public producto: ApiProducto[] = [];
  public menu: ApiProducto[] = [];
  public valid: boolean = false;

  constructor( private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getTipoProducts();
    
  }

  getAllProducts(){
    return this.api.get<ApiProducto[]>('producto')
    .subscribe( res => {
      this.producto = res;
      this.getProductsMenu();
    });
  }

  getProductsMenu(){
    const p = this.producto.filter(d => d.menu == true);
    this.menu = p
    this.valid = true;
    console.log(this.menu);
    
  }

  getTipoProducts(){
    return this.api.get<ApiTipoPro[]>('producto/tipo/producto')
    .subscribe( res => {
      this.tipos = res;
      console.log(this.tipos)
    });
  }
}
