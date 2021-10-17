import { Component, OnInit, Output } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { TipoProducto } from 'src/app/shared/models/index.models';


@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css'],
})
export class MenuHomeComponent implements OnInit {

  public tipos: TipoProducto[] = [];


  constructor(public menuService: MenuService) {}

  ngOnInit(): void {
  this.getTipoProductos();
  }

  getTipoProductos(){
    this.menuService.getTipo.subscribe(
      data => {this.tipos = data;}
    )
  }
  
}
