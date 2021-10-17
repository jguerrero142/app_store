import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { Producto } from 'src/app/shared/models/Producto.model';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { User } from 'src/app/shared/models/index.models';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {

  // Obtiene el tipo de producto 
  @Input() tipoPro: number;

  public productos: Producto[] = [];
  public data: Producto;
  public suma: any;

  //Variables Auth
  public role: number;
  public user: User;
  public id: any; 

  //Variables del componente
  public ticket: any = [];
  public noData: boolean;
  public alert: boolean;

            constructor(
              public menuServices: MenuService,
              public ticketServices: TicketsService,
              public coreService: CoreService
            ) {
              this.noData = false;
            }

  ngOnInit(): void {
    this.getProductos();
    
  }
  afterClose(): void {
    this.alert = false;
  }

  getAuth() {
    this.coreService.getUser.subscribe((d) => {
      if (d) {
        this.user = d;
        this.role = d.role;
        this.id = d.id_user;
      }
    });
  }

    getProductos() {
    this.menuServices.getProductos(this.tipoPro).subscribe((resp: Producto[]) => {
      if (resp.length > 0) {
        this.productos = resp;
        this.getFin();
      }else{
        this.noData = true
      }
    });
  }
  
  // Pruebas metodos
  getFin(){
    //retorna el primer item que cumpla con true
    // if(this.productos.length > 0){
    //   console.log(this.productos.find(item => item.menu == true))
    // } 

    // retorna true solo si un item cumple
    // if(this.productos.length > 0){
    //   console.log(this.productos.some(item => item.id == 18 ) )
    // }  

    //retorna true si todos los elementos cumplen
    // if(this.productos.length > 0){
    //   console.log(this.productos.every(item => item.id == 18 ) )
    // }  

    // regresa true si encuentra un item con la igualda
    // if(this.productos.length > 0){
    //   const newus = this.productos.map(d => d.name.includes('bunuelo'))
    //   console.log(newus)
    // }

    // filtramos items en el arreglo
    //  if(this.productos.length > 0){
    //    const newus = this.productos.filter(d => d.menu == true)
    //   console.log(newus)
    // } 

    // suma los elementos de un arreglo
    // if(this.productos.length > 0){      
    //     const newus = this.productos.reduce((suma , d ) =>  suma + d.valor,0  )
    //     console.log(newus)
    //   } 

    // if(this.productos.length > 0){      
    //     const newus = this.productos.findIndex( ( d =>d.valor, index))
    //     console.log(newus)
    //   } 
  } 

  saveTicket(data: Producto){
     console.log(data)
     this.menuServices.setTicket(data);
    //  this.menuServices.ticketAdd.emit(true);
  }
    

  // saveTicket(id: number) {
  //   this.getAuth();
  //   console.log(this.id, id);
  //   if (this.id) {
  //     this.ticket = {
  //       user_ticket: this.id,
  //       producto: id,
  //     };
  //     this.ticketServices.saveTicket(this.ticket).subscribe((resp) => {
  //       this.menuServices.ticketAdd.emit(true);
  //     });
  //   } else {
  //     this.alert = true;
  //   }
  // }
}
