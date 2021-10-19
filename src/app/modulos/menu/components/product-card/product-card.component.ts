import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { Producto } from 'src/app/shared/models/Producto.model';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { User } from 'src/app/shared/models/index.models';
import { StoreService } from 'src/app/core/store.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {

  // Obtiene el tipo de producto 
  @Input() tipoPro: number;

  public productos: Producto[] = [];
  public menu: Producto[] = [];


  //Variables Auth
  public role: number;
  public user: User;

  //Variables del componente
  public noData: boolean;
  public alert: boolean;

            constructor(
              public menuServices: MenuService,
              public ticketServices: TicketsService,
              public storeService: StoreService
            ) {
              this.noData = false;
            }

  ngOnInit(): void {
    this.getProductos();
    this.getAuth();
  }
 
      //Obtenemos las variables del usuario
      getAuth() {
        this.storeService.getUser.subscribe((d) => {
          if (d) {
            this.user = d;
            this.role = d.role;
            this.alert = false;
          }
        });
      }

      //Obtenemos todos los productos
      getProductos() {
            this.menuServices.getProducto.subscribe( data =>{
              if(data.length > 0 ){
                const pro = data.filter( d=> d.producto_tipo == this.tipoPro);
                if(pro.length > 0){
                  this.productos = pro
                  }else{
                  this.noData = true
                }
              }
            })
      }

      //Guardamos el ticket
      saveTicket(data: Producto){
          if(this.user){
          this.menuServices.setTickets = data;
          }else{
          this.alert = true;
          }
          
      }

      // Funcion controla alerta
      afterClose(): void {
          this.alert = false;
      }
 
  // Pruebas metodos
  // getFin(){
  //   //retorna el primer item que cumpla con true
  //   // if(this.productos.length > 0){
  //   //   console.log(this.productos.find(item => item.menu == true))
  //   // } 

  //   // retorna true solo si un item cumple
  //   // if(this.productos.length > 0){
  //   //   console.log(this.productos.some(item => item.id == 18 ) )
  //   // }  

  //   //retorna true si todos los elementos cumplen
  //   // if(this.productos.length > 0){
  //   //   console.log(this.productos.every(item => item.id == 18 ) )
  //   // }  

  //   // regresa true si encuentra un item con la igualda
  //   // if(this.productos.length > 0){
  //   //   const newus = this.productos.map(d => d.name.includes('bunuelo'))
  //   //   console.log(newus)
  //   // }

  //   //filtramos items en el arreglo
  //   //  if(this.productos.length > 0){
  //   //   this.menu = this.productos.filter(d => d.menu == true)
  //   //   console.log(this.menu)
  //   // } 

  //   // suma los elementos de un arreglo
  //   // if(this.productos.length > 0){      
  //   //     const newus = this.productos.reduce((suma , d ) =>  suma + d.valor,0  )
  //   //     console.log(newus)
  //   //   } 


        //encuentra item por index
  //   if(this.productos.length > 0){      
  //       const newus = this.productos.findIndex( d=> d.valor > 5000)
  //       console.log(newus)
  //     } 
  //  } 

  
 
}
