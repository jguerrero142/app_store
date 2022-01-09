import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/http/api.service';
import { ApiTipo, ApiProducto } from '../../interface';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  // public tipos: ApiTipo [] = [];
  // public producto: ApiProducto[] = [];
  public menu: ApiProducto[] = [];
  public valid: boolean = false;
  array = [1, 2, 3, 4];
  constructor(private service: IndexService) { 
    this.getMenu(); }

  ngOnInit(): void {
  }


  getMenu(){
    this.service.getAllProducts()
    .subscribe( resp =>{
      this.menu = resp.filter( d => d.menu == true);
      this.valid = true;
    })
  }
  

}
