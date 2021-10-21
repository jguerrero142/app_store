import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket,Factura } from '../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { AuthService } from './auth/auth.service';
import { Store } from './modal/Store.modal';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //Variable Auth0
  public user: User;
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
  set setStore(store: Store) {
    this.store.push(store);
    this.storeObservable.next(this.store);
    console.log(this.store);
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

  constructor(private auth: AuthService, private http: HttpClient) {}

  getAuth() {
    this.auth.userProfile$.subscribe((perfil: User) => {
      this.user = perfil;
      if (this.user) {
        this.loginUser(this.user.sub, this.user).subscribe((s) => {
          if (s != null) {
            this.id = s.id_user;
            this.userSetObs = s;
            this.setStore = s;
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
    this.getUserTickets();
    this.getUserPedidos();
    this.getUserFacturas();
  }

  //Obtiene los TICKETS del USUARIO
  getUserTickets() { 
    return this.http
      .get<Ticket[]>(`${this.API_URI}/ticket/user/${this.id}`)
      .subscribe((d) => {
        if (d != null) {
          this.setTickets = d
        }
      });
  }

  // Obtenemos los pedidos del USUARIO
  getUserPedidos() {
    this.pedidos = [];
    return this.http
      .get<Pedido[]>(`${this.API_URI}/pedido/get/${this.id}`)
      .subscribe((data) => {
        if (data.length > 0) {
          data.forEach((item, index, arr) => {
            const i = this.tickets.filter((d) => d.id_pedido == item.id);
            data[index].ticket = i;
          });
          this.setPedidos = data;
          this.store.forEach((item,index) => {
            const p = this.pedidos.filter((p)=> p.id_user == item.id_user);
            this.store[index].pedido = p  
          })

        }
      });
  }

  getUserFacturas() {
    this.facturas = [];
    return this.http
      .get<Factura[]>(`${this.API_URI}/factura/get/${this.id}`)
      .subscribe((data) =>{
        this.store.forEach((item, index) =>{
          const f = data.filter((f) => f.id_user == item.id_user);
          this.store[index].factura = f
        })
        this.setFactura = data
      })
    
  }
}
