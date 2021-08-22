import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user.service';
import { Ticket } from '../../models/Ticket';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  
  
  id: number;
  role: number;
  user$: any = [];
  user: any = [];

  constructor(public auth: AuthService,
              public userServices: UsersService) { }

  ngOnInit(): void {
    this.userServices.getAuth();
  }
   
}
