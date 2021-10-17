import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  constructor(private userServices: UsersService) {}

  ngOnInit(): void {}
}
