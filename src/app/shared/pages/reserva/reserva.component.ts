import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
})
export class ReservaComponent implements OnInit {
  constructor(private userServices: UsersService) {}

  ngOnInit() {
    this.userServices.getAuth();
  }
}
