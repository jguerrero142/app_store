import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../../shared/http/api.service';
import { ApiProducto } from 'src/app/modulos/shared/interface/index';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() tipoPro: number;
  public productos: ApiProducto[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    return this.api.get<ApiProducto[]>('producto')
    .subscribe( res => {
      const data = res.filter(d => d.producto_tipo == this.tipoPro);
      if(data.length >0){
        this.productos = data;
      }
    });
  }

}
