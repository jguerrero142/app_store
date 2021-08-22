import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Ticket } from '../models/Ticket';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  
  private tick: Ticket[];
  private tick$: Subject<Ticket[]>;
  
  ticketAdd = new EventEmitter<boolean>();


  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Obtienes los ticket en estado true.
  getData(){
    return this.http.get(`${this.API_URI}/ticket/data/ticket`)
  }
   //Obtiene el valor total de los ticket en estado true.
   inData(){
    return this.http.get(`${this.API_URI}/ticket/data/total`)
  }

  //Obtiene los tickets de un pedido en especifico.
  userTickets(id: number){
    return this.http.get( `${this.API_URI}/ticket/ticketPedido/${id}`);
  }

  putEstado( id: number , pedido: string ){
    return this.http.put(`${this.API_URI}/ticket/pedido/id/${id}`, pedido );
  }

  // CRUD Tickets

    getTickets(){
      return this.http.get( `${this.API_URI}/ticket`);
    }   
    
    getTicket(id: string){
      return this.http.get(`${this.API_URI}/ticket/${id}`)
    }    
    
    deletTicket(id: string | number){
      return this.http.delete(`${this.API_URI}/ticket/${id}`);
    }
    saveTicket(ticket: Ticket){
      return this.http.post(`${this.API_URI}/ticket`, ticket);
    }
    
    updateTicket(id: string | number, updateTicket: Ticket): Observable<Ticket>{
      return this.http.put(`${this.API_URI}/ticket/${id}`, updateTicket);
    }
    
    
}
