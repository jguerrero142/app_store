import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { Producto } from '../../../../shared/models/Producto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() tipoPro: number;
  public productos: Producto[] = [];
  public resx: any ;
  constructor( public menuservice: MenuService) { 
    
  }

  ngOnInit(): void {
    this.getTipoProductos();
  }

  getTipoProductos(){
    this.menuservice.getProductos(this.tipoPro)
    .subscribe( resp => {
      this.resx = resp
      this.productos.push(this.resx)
    })
  }

}
