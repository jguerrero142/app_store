import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket,Factura } from '../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './model/Store.model';
;


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //Variable Auth0
  public user: User;
  public use: User[] = [];
  private id: number;
  private store: Store[] = [];
  public pedidos: Pedido[] = [];
  public tickets: Ticket[] = [];
  public facturas: Factura[] = [];

   //////////////////////Observable Store /////////////////////////////////////////////
  private storeObservable: BehaviorSubject<Store[]> = new BehaviorSubject<
    Store[]
  >(null);

  get getStore(){
    return this.storeObservable.asObservable();
  } 
  set setStore(store: Store[]) {
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

  //////////////////////Observable Pedido /////////////////////////////////////////////

  set sendPedido( pedido: Pedido){
    this.store.map(item => {
      item.pedido.push(pedido)
    })
    this.setStore = this.store
  }

  set deletPedido(index: number){
    this.store.map(s=>{
      s.pedido.splice(index,1);
    })
    this.setStore = this.store
  }


  // Url api
  API_URI = environment.wsUrl;

  constructor(private auth: AuthService, 
              private http: HttpClient
              ) {}

  getAuth() {
    this.auth.userProfile$.subscribe((perfil: User) => {
      this.user = perfil;
      if (this.user) {
        this.loginUser(this.user.sub, this.user).subscribe((s) => {
          if (s != null) {
            this.id = s.id_user;
            this.userSetObs = s;
            this.store.push(s);
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
   
    
    // 
  }

  //Obtenemos los pedidos del USUARIO
  getUserPedidos() {
  this.pedidos = [];
  return this.http
    .get<Pedido[]>(`${this.API_URI}/pedido/get/${this.id}`)
    .subscribe((data) => {
      
        this.store.forEach((item, index)=>{
          const p = data.filter((d) => d.id_user == item.id_user);
          this.store[index].pedido = p; 
        })
        
    })
  }

  // Obtenemos los pedidos del USUARIO
  getUserFacturas() {
    this.facturas = [];
    return this.http
      .get<Factura[]>(`${this.API_URI}/factura/get/${this.id}`)
      .subscribe((data) =>{
        this.store.forEach((item, index) =>{
          const f = data.filter((f) => f.id_user == item.id_user);
          this.store[index].factura = f
        })
      })
    
  }

  //Obtiene los TICKETS del USUARIO
  getUserTickets() { 
      return this.http
        .get<Ticket[]>(`${this.API_URI}/ticket/user/${this.id}`)
        .subscribe((data) => {
            this.store.forEach((store, index) =>{
              store.pedido.forEach((item, index)=>{
                const t = data.filter(d=> d.id_pedido == item.id)
                store.pedido[index].ticket = t;
              })
              // item.pedido[index].ticket = data.filter(d=> d.id_pedido == item.pedido.)
            })
          
        });
  }

}
