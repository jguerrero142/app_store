import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { Producto } from 'src/app/shared/models/Producto.model';

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.component.html',
  styleUrls: ['./menu-today.component.css'],
})
export class MenuTodayComponent implements OnInit {

  public menu: Producto[] = [];
  public img: boolean = false;

  constructor(public menuServices: MenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(){    
    this.menuServices.getMenus.subscribe( data =>{
      this.menu = data;
      this.img = true;
    })
  }

}
