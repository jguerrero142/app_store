import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/index.models';
import { MenuService } from '../../services/menu-service.service';

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.component.html',
  styleUrls: ['./menu-today.component.css'],
})
export class MenuTodayComponent implements OnInit {
  public menu: Menu[] = [];
  public img: boolean = false;
  constructor(public menuServices: MenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }
  getMenu() {
    this.menuServices.getMenu().subscribe((resp: Menu[]) => {
      this.menu = resp;
      this.img = true;
      console.log(this.menu);
    });
  }
}
