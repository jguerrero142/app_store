import { Component, OnInit, Input } from '@angular/core';

//Modales
import { User,Producto } from 'src/app/shared/models/index.models';


//Servies
import { StoreService } from 'src/app/core/store.service';
import { MenuService } from '../../services/menu-service.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})

export class ProductCardComponent implements OnInit {

  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
  // Obtiene el tipo de producto 
  @Input() tipoPro: number;

  //Variables Auth
  public user: User;

  //Variables del componente
  public productos: Producto[] = [];
  public noData: boolean = false;
  public alert: boolean;

            constructor(
              public menuServices: MenuService,
              public storeService: StoreService
            ) {
            }

  ngOnInit(): void {
    this.getProductos();
    this.getAuth();
  }
 
      //Obtenemos las variables del usuario
      getAuth() {
        this.storeService.getStore.subscribe((d) => {
          if (d) {
            this.user = d.user;
            this.alert = false;
          }
        });
      }
      //Obtenemos todos los productos
      getProductos() {
        this.menuServices.getStore.subscribe( data =>{
          if(data.productos.length > 0 ){
          const pro = data.productos.filter( d=> d.producto_tipo == this.tipoPro);
                if(pro.length > 0){
                  this.productos = pro
                  this.noData = true
                }
        }})
      }

      //Guardamos el ticket
      saveTicket(data: Producto){        
          if(this.user){
            this.menuServices.setStoreTickets = data;
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
