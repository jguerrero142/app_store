import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket,Factura, MetodoPago } from '../modulos/shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './class/Store.model';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //Variable Auth0
  public user: User;
  private id: number;
  private role: number;
  public data: Pedido;

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

  set setPedido(pedido: Pedido){
    this.store.pedidos.push(pedido);
    this.setStore = this.store
  }

  set updatePedido(pedido: Pedido){
    this.data = pedido;
    const p = this.store.pedidos.findIndex(d => d.id_pedido == this.data.id_pedido );
    this.store.pedidos.splice(p,1);
    this.store.pedidos.push(this.data);
    this.setStore = this.store;
  }

  set setFactura(factura: Factura){
    this.store.facturas.push(factura);
    this.setStore = this.store
  }

  set updateFactura(num: number){
    this.store.facturas.map(d=>{
      if(d.estado_factura == 1 || d.estado_factura == 2 || d.estado_factura == 3){
        d.estado_factura = num
      }
    });
    this.setStore = this.store
  }

  set deletPedido(index: number){
    this.store.user.pedido.splice(index,1);
    this.setStore = this.store
  }

  
  // Url api
  API_URI = environment.wsUrl;

  constructor(private auth: AuthService, 
              private http: HttpClient
              ) {console.log("carshop")}

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
      this.getAsUser();
      this.getAsFacturas();
      this.getAsPedido();
      this.getAsTicket();
      this.getAsMetodosPago();
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
                const t = data.filter(d => d.id_pedido == item.id_pedido)
                this.store.user.pedido[index].ticket = t
              })
          });
    }

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
            const ad = data.filter( a => a.id_pedido == item.id_pedido);
            this.store.pedidos[index].ticket = [];
            this.store.pedidos[index].ticket = ad;
          })
      });
    }

    //Obtiene todos los metodos de Pago
    getAsMetodosPago(){
      return this.http
        .get<MetodoPago[]>(`${this.API_URI}/factura/metodo-pago/get`)
        .subscribe((data) => {
            this.store.metodos = data;
        })
    }
  

}
