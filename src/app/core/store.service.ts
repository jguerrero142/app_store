import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket,Factura } from '../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './class/Store.model';
import { MenuService } from '../modulos/menu/services/menu-service.service';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //Variable Auth0
  public user: User;
  private id: number;
  private role: number;

  // Variables Store
  public store: Store = new Store;

  //////////////////////Observable Store /////////////////////////////////////////////
  private storeObservable: BehaviorSubject<Store> = new BehaviorSubject<Store>(this.store);

  get getStore(){
    return this.storeObservable.asObservable();
  } 
  set setStore(store: Store) {
    this.storeObservable.next(store);
    console.log(store);
  }


  //////////////////////Efectos Store /////////////////////////////////////////////

  set sendPedido( pedido: Pedido){
    this.store.user.pedido.push(pedido);
    this.store.pedidos.push(pedido);
    this.setStore = this.store
  }

  set deletPedido(index: number){
    this.store.user.pedido.splice(index,1);
    this.setStore = this.store
  }

  // Url api
  API_URI = environment.wsUrl;

  constructor(private auth: AuthService, 
              private http: HttpClient,
              private menuService: MenuService
              ) {}

    getAuth() {
    this.auth.userProfile$.subscribe((perfil: User) => {
      this.user = perfil;
      if (this.user) {
        this.loginUser(this.user.sub, this.user).subscribe((s) => {
          if (s != null) {
            this.id = s.id_user;
            this.role = s.id_role; 
            this.store.user = s;
            this.getStoreState();
          }
        });
      }
    });
    }

    loginUser(id: string | number, updateUser: User): Observable<User> {
      return this.http.post<User>(`${this.API_URI}/user/login/${id}`, updateUser);
    }

    getStoreState(){
      this.getUserPedidos();
      this.getUserFacturas();
      this.getUserTickets();
      if(this.role == 5){
      // this.getAsProductos();
      this.getAsUser();
      this.getAsFacturas();
      this.getAsPedido();
      this.getAsTicket();
      }

      this.setStore = this.store;
    }

    getLoadingStore(){
      this.getAsFacturas();
      this.getAsPedido();
      this.getAsTicket();
      
      this.setStore = this.store;
    }

    //Obtenemos los pedidos del USUARIO
    getUserPedidos() {
    return this.http
      .get<Pedido[]>(`${this.API_URI}/pedido/get/${this.id}`)
      .subscribe((data) => {
          this.store.user.pedido = data
      })
    }

    // Obtenemos las facturas del USUARIO
    getUserFacturas() {
      return this.http
        .get<Factura[]>(`${this.API_URI}/factura/get/${this.id}`)
        .subscribe((data) =>{
          this.store.user.factura = data;
        })
      
    }

    //Obtiene los TICKETS del USUARIO
    getUserTickets() { 
        return this.http
          .get<Ticket[]>(`${this.API_URI}/ticket/user/${this.id}`)
          .subscribe((data) => {
                this.store.user.pedido.forEach((item, index)=>{
                const t = data.filter(d => d.id_pedido == item.id)
                this.store.user.pedido[index].ticket = t
              })
          });
    }

    //Obtiene los productos del Observable Productos

    // getAsProductos(){
    //       this.menuService.getProducto.subscribe(d=>{
    //         this.store.productos = d;
    //       });
    //       this.menuService.getMenus.subscribe(d=>{
    //         this.store.menus = d;
    //       })
    //       this.menuService.getTipo.subscribe(d=>{
    //         this.store.tipo_producto = d;
    //       })
    //   }

    //Obtiene todos los pedidos
    getAsPedido(){
        return this.http
          .get<Pedido[]>(`${this.API_URI}/pedido/`)
          .subscribe((data) => {
              this.store.pedidos = data;
          })
    }

    // Obtiene todos los Usuarios
    getAsUser(){
      return this.http
        .get<User[]>(`${this.API_URI}/user/`)
        .subscribe((data) => {
            this.store.users = data;
        })
    }


    // Obtiene todas las facturas de todos los usuario
    getAsFacturas(){
      return this.http
        .get<Factura[]>(`${this.API_URI}/factura/`)
        .subscribe((data) => {
            this.store.facturas = data;
        })
      } 

    //Obtienen los tickets e ingresa a cada pedido x ID
    getAsTicket(){
      return this.http
      .get<Ticket[]>(`${this.API_URI}/ticket/`)
      .subscribe((data) => {
            this.store.pedidos.forEach((item, index)=>{
            const ad = data.filter( a => a.id_pedido == item.id);
            this.store.pedidos[index].ticket = ad;
          })
      });
    }
  

}
