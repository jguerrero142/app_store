import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket,Factura } from '../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './model/Store.model';
import { PedidoService } from '../shared/services/pedido.service';
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

  private pedidoObservable: BehaviorSubject<Pedido[]> = new BehaviorSubject<
    Pedido[]
  >(null);

  getPedidos = this.pedidoObservable.asObservable();

  set setPedidos(pedido: Pedido[]) {
    this.pedidos = pedido;
    this.pedidoObservable.next(this.pedidos);
  }

  private ped: number

  set sendPedido( pedidox: Pedido){
    this.pedidoService.savePedido(pedidox).subscribe(d=>{});
    this.store.filter(s=>{
      s.pedido.map( p => {
        this.ped = Math.max(p.id)
      })      
    })
    this.store.forEach((ite, index)=>{
      pedidox.created_at = new Date();
      pedidox.estado_valor = 1;
      pedidox.value_pedido = false;
      pedidox.pedido_estado = 1;
      pedidox.id = this.ped + 1;
      ite.pedido.push(pedidox);
      
    })
    console.log(this.store)
    // this.store.filter(d=> {
    //   d.pedido.map(p => {
    //     const ma = Math.max(p.id)
    //     pedidox.id = ma + 1;
    //     d.pedido.push(pedidox)
    //   })
    // })
    
    this.setStore = this.store
  }

   //////////////////////Observable Ticket /////////////////////////////////////////////

   private ticketObservable: BehaviorSubject<Ticket[]> = new BehaviorSubject<
   Ticket[]
  >(null);

  get getTickets(){
    return this.ticketObservable.asObservable();
  } 

  set setTickets(ticket: Ticket[]) {
    this.tickets = ticket;
    this.ticketObservable.next(this.tickets);
  }

  //////////////////////Observable Ticket /////////////////////////////////////////////

  private facturaObservable: BehaviorSubject<Factura[]> = new BehaviorSubject<
  Factura[]
 >(null);

 get getFactura(){
   return this.facturaObservable.asObservable();
 } 

 set setFactura(factura: Factura[]) {
   this.facturas = factura;
   this.facturaObservable.next(this.facturas);
 }

  // Url api
  API_URI = environment.wsUrl;

  constructor(private auth: AuthService, private http: HttpClient,
    private pedidoService: PedidoService) {}

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
        if(data.length > 0){
          this.store.forEach((item, index)=>{
            const p = data.filter((d) => d.id_user == item.id_user);
            this.store[index].pedido = p; 
          })
          
        }
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
            if (data.length > 0){
              this.store.forEach((store, index) =>{
                store.pedido.forEach((item, index)=>{
                  const t = data.filter(d=> d.id_pedido == item.id)
                  store.pedido[index].ticket = t;
                })
                // item.pedido[index].ticket = data.filter(d=> d.id_pedido == item.pedido.)
              })
            }
          });
      }

  // Obtenemos los pedidos del USUARIO
  // getUserPedidos() {
  //   this.pedidos = [];
  //   return this.http
  //     .get<Pedido[]>(`${this.API_URI}/pedido/get/${this.id}`)
  //     .subscribe((data) => {
  //       if (data.length > 0) {
  //         data.forEach((item, index, arr) => {
  //           const i = this.tickets.filter((d) => d.id_pedido == item.id);
  //           data[index].ticket = i;
  //         });
  //         this.setPedidos = data;
  //         this.store.forEach((item,index) => {
  //           const p = this.pedidos.filter((p)=> p.id_user == item.id_user);
  //           this.store[index].pedido = p  
  //         })

  //       }
  //     });
  // }

  
}
