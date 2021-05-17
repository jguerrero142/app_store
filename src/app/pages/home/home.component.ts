import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.getProductos()
    .subscribe(res => {
      console.log(res);
      this.productos = res;
    },
    )
  }

}
