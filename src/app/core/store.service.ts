import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket,Factura } from '../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './class/Store.model';
import { adStore } from './class/adStore.model';
import { MenuService } from '../modulos/menu/services/menu-service.service';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //Variable Auth0
  public user: User;
  private id: number;

  // Variables Store
  private store: Store = new Store;

  //Variable AdStore
  private adStore: adStore = new adStore;


   //////////////////////Observable Store /////////////////////////////////////////////
  private storeObservable: BehaviorSubject<Store> = new BehaviorSubject<Store>(this.store);

  get getStore(){
    return this.storeObservable.asObservable();
  } 
  set setStore(store: Store) {
    this.storeObservable.next(store);
    console.log(store);
  }
   //////////////////////Observable Usuario /////////////////////////////////////////////

   private userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );

  getUser = this.userObservable.asObservable();
  
  set userSetObs(data: User) {
    this.userObservable.next(data);
  }

  //////////////////////Efectos Store /////////////////////////////////////////////

  set sendPedido( pedido: Pedido){
    this.store.pedido.push(pedido);
    this.adStore.pedidos.push(pedido);
    this.setStore = this.store
    this.setadStore = this.adStore
  }

  set deletPedido(index: number){
    this.store.pedido.splice(index,1);
    this.setStore = this.store
  }

   //////////////////////Observable Admin /////////////////////////////////////////////
   private adStoreObservable: BehaviorSubject<adStore> = new BehaviorSubject<adStore>(this.adStore);

    get getadStore(){
      return this.adStoreObservable.asObservable();
    }

      set setadStore(store: adStore) {
        this.adStoreObservable.next(store);
        console.log(this.adStore)
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
            if(s.id_role == 1 || s.id_role == 2 || s.id_role == 5 || s.id_role == 6){
              this.getAsStore();
            }
            this.userSetObs = s;
            this.store = s;
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
    this.setStore = this.store
   
  }

  //Obtenemos los pedidos del USUARIO
  getUserPedidos() {
  return this.http
    .get<Pedido[]>(`${this.API_URI}/pedido/get/${this.id}`)
    .subscribe((data) => {        
        this.store.pedido = data;
    })
  }

  // Obtenemos los pedidos del USUARIO
  getUserFacturas() {
    return this.http
      .get<Factura[]>(`${this.API_URI}/factura/get/${this.id}`)
      .subscribe((data) =>{
        this.store.factura = data;
      })
    
  }

  //Obtiene los TICKETS del USUARIO
  getUserTickets() { 
      return this.http
        .get<Ticket[]>(`${this.API_URI}/ticket/user/${this.id}`)
        .subscribe((data) => {
              this.store.pedido.forEach((item, index)=>{
              const t = data.filter(d => d.id_pedido == item.id)
              this.store.pedido[index].ticket = t
            })
        });
  }

  //Obtiene los datos tipo ADMIN
  getAsStore(){
    this.getAsProductos();
    this.getAsUser();
    this.getAsFacturas();
    this.getAsPedido();
    this.getAsTicket();
    
    this.setadStore = this.adStore;
    
      }

  getAsPedido(){
      return this.http
        .get<Pedido[]>(`${this.API_URI}/pedido/`)
        .subscribe((data) => {
            this.adStore.pedidos = data;
        })
      }

  getAsUser(){
    return this.http
      .get<User[]>(`${this.API_URI}/user/`)
      .subscribe((data) => {
          this.adStore.users = data;
      })
    }

  getAsFacturas(){
    return this.http
      .get<Factura[]>(`${this.API_URI}/factura/`)
      .subscribe((data) => {
          this.adStore.facturas = data;
      })
    }

    getAsProductos(){
      this.menuService.getProducto.subscribe(d=>{
        this.adStore.productos = d;
      });
      this.menuService.getMenus.subscribe(d=>{
        this.adStore.menus = d;
      })
      this.menuService.getTipo.subscribe(d=>{
        this.adStore.tipo_producto = d;
      })
      }

    
    getAsTicket(){
      return this.http
      .get<Ticket[]>(`${this.API_URI}/ticket/`)
      .subscribe((data) => {
            this.adStore.pedidos.forEach((item, index)=>{
            const ad = data.filter( a => a.id_pedido == item.id);
            this.adStore.pedidos[index].ticket = ad;
          })
      });
    }
  

}
