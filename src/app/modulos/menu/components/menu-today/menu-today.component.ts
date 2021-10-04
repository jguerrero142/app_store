import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.component.html',
  styleUrls: ['./menu-today.component.css']
})
export class MenuTodayComponent implements OnInit {

  array = [1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
    
  }

}
