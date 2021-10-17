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
  public idtipo: number;
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getTipos().subscribe((res: TipoProducto[]) => {
      this.tipos = res;
      this.tipos.map((res) => (this.idtipo = res.id_tipo));
    });
  }
}
