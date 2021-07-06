import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Ticket } from '../models/Ticket';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  
  private tick: Ticket[];
  private tick$: Subject<Ticket[]>;
  


  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.tick = [];
    this.tick$ = new Subject();
  }
    getTickets(){
      return this.http.get( `${this.API_URI}/ticket`);
    }
    userTickets(id: number){
      return this.http.get( `${this.API_URI}/ticket/ticketPedido/${id}`);
    }
    
    getTicket(id: string){
      return this.http.get(`${this.API_URI}/ticket/${id}`)
    }
    getData(){
      return this.http.get(`${this.API_URI}/ticket/data/ticket`)
    }
    inData(){
      return this.http.get(`${this.API_URI}/ticket/data/total`)
    }
    
    deletTicket(id: string | number){
      return this.http.delete(`${this.API_URI}/ticket/${id}`);
    }
    saveTicket(ticket: Ticket){
      this.tick.push(ticket);
      this.tick$.next(this.tick);
      this.newsTicket();
      return this.http.post(`${this.API_URI}/ticket`, ticket);
    }
    newsTicket(): Observable<any>{   
      return this.tick$.asObservable();
    }
    updateTicket(id: string | number, updateTicket: Ticket): Observable<Ticket>{
      return this.http.put(`${this.API_URI}/ticket/${id}`, updateTicket);
    }
    AddPedido( id: number , pedido: string ){
      return this.http.put(`${this.API_URI}/ticket/pedido/id/${id}`, pedido );
    }
    
}
