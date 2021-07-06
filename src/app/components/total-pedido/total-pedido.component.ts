import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-pedido',
  templateUrl: './total-pedido.component.html',
  styleUrls: ['./total-pedido.component.css']
})
export class TotalPedidoComponent implements OnInit {


  @Input() user: number;
  constructor() { 
    
  }
  
  ngOnInit(): void {
    
  }

}
