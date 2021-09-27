import { Component, OnInit, Output } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { TipoProducto } from '../../../../shared/models/Tipo-producto';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  
  public tipos: TipoProducto[] = [];
  public idtipo: number;
  constructor( public menuService: MenuService) { 
  }

  ngOnInit(): void {
    this.menuService.getTipos()
    .subscribe((res: TipoProducto[])  =>{
      this.tipos = res;
      this.tipos.map(res => this.idtipo = res.id_tipo)
      console.log(this.tipos)});
  }

 

}
