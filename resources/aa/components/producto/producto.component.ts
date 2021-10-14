import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  

  constructor( public auth: AuthService ) {}

  ngOnInit(): void {}
  

  

}
