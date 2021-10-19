import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modals
import { User, Pedido, Ticket } from '../shared/models/index.models';
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

  private storeObservable: BehaviorSubject<Store[]> = new BehaviorSubject<
    Store[]
  >(null);

  private userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );

  getStore = this.storeObservable.asObservable();
  getUser = this.userObservable.asObservable();
  // get userGetObs() {
  //   return this.userObservable.asObservable();
  // }

  set setStore(store: Store) {
    this.store.push(store);
    this.storeObservable.next(this.store);
    console.log(this.store);
  }

  set userSetObs(data: User) {
    this.userObservable.next(data);
  }

  //////////////////////Observable Usuario /////////////////////////////////////////////

  private pedidoObservable: BehaviorSubject<Pedido[]> = new BehaviorSubject<
    Pedido[]
  >(null);

  getPedidos = this.pedidoObservable.asObservable();

  // Enviamos los PEDIDO al arreglo
  set setPedidos(pedido: Pedido[]) {
    this.pedidos = pedido;
    this.pedidoObservable.next(this.pedidos);
    console.log(this.pedidos);
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
            this.getUserPedidos(this.id);
          }
        });
      }
    });
  }

  loginUser(id: string | number, updateUser: User): Observable<User> {
    return this.http.post<User>(`${this.API_URI}/user/login/${id}`, updateUser);
  }

  //Obtiene los TICKETS del USUARIO
  getUserTickets(id: number) {
    return this.http
      .get<Ticket[]>(`${this.API_URI}/ticket/user/${id}`)
      .subscribe((d) => {
        if (d != null) {
          this.tickets = d;
        }
      });
  }

  // Obtenemos los pedidos del USUARIO
  getUserPedidos(id: number) {
    this.pedidos = [];
    this.getUserTickets(id);
    return this.http
      .get<Pedido[]>(`${this.API_URI}/pedido/get/${id}`)
      .subscribe((data) => {
        if (data.length > 0) {
          data.forEach((item, index, arr) => {
            const i = this.tickets.filter((d) => d.id_pedido == item.id);
            data[index].ticket = i;
          });
          this.setPedidos = data;
        }
      });
  }
}
