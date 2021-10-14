import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() user: number;
  
  
  constructor(public auth: AuthService
              ) {
              
              }

  ngOnInit(): void {
    
  }          
}