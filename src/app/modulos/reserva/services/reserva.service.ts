import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Modales
import { Pedido, Ticket } from '../../../shared/models/index.models';
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

  public valid: boolean = false;
  public reservas: Pedido[] = [];

  

  private reservaObservable: BehaviorSubject <Pedido[]> = new BehaviorSubject<Pedido[]>(
   null
  );

  getReserva = this.reservaObservable.asObservable();

  // Enviamos los RESERVAS al arreglo 
  set setReservas(reserva: Pedido[]){
    // this.pedidos = pedido;
    this.reservaObservable.next(reserva);
    
  }

  API_URI = environment.wsUrl;
  

  constructor(private http: HttpClient,
              private storeServices: StoreService) 
              {
                
                this.getAuth();
              }


   getAuth() {
    this.storeServices.getUser.subscribe((d) => {
      if (d.id_user > 0 ) {          
        this.user = d.id_user;
      }
    });
  }
  
}
