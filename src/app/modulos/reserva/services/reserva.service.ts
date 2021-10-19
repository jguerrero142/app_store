import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modales
import { Pedido, Ticket, Pedidoo } from '../../../shared/models/index.models';
import { environment } from 'src/environments/environment';

//Servicios
import { StoreService } from 'src/app/core/store.service';


@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  public pedidos: Pedido[] = []
  public tickets: Ticket[] = []
  public user: number;
  alert: any;

  

  private pedidoObservable: BehaviorSubject <Pedido[]> = new BehaviorSubject<Pedido[]>(
    null
  );

  getPedidos = this.pedidoObservable.asObservable();

  // Enviamos los PEDIDO al arreglo 
  set setPedidos(pedido: Pedido[]){
    // this.pedidos = pedido;
    this.pedidoObservable.next(pedido);
    
  }

  API_URI = environment.wsUrl;
  

  constructor(private http: HttpClient,
              private storeService: StoreService) 
              {
                this.getAuth();
              }


   getAuth() {
    this.alert = this.storeService.getUser.subscribe((d) => {
      if (d.id_user > 0 ) {          
        this.user = d.id_user;
        this.getUserTickets(this.user);
        this.getUserPedidos(this.user); 
      }
    });
  }
  //Obtiene los TICKETS del USUARIO
  getUserTickets(id: number){
    return this.http.get<Ticket[]>(`${this.API_URI}/ticket/user/${id}`)
    .subscribe(d => {
      if(d != null){
        this.tickets = d
      }
      
    })
  }

   
   // Obtenemos los pedidos del USUARIO
   getUserPedidos(id: number){      
    this.pedidos = [];
    return this.http.get<Pedidoo[]>( `${this.API_URI}/pedido/get/${id}`).subscribe(data =>{
    if(data.length > 0 ){
      data.forEach( (item, index, arr)=>{
          const i = this.tickets.filter( d=> d.id_pedido == item.id)
          data[index].ticket = i
     });
      this.pedidos = data;
      this.setPedidos = data;
    }  
  });
}   
  
}
