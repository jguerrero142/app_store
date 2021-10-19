import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/index.models';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  Tick: Ticket[] = [];

  API_URI = environment.wsUrl;

  constructor(private http: HttpClient) {}

  // CRUD Tickets

  getTickets() {
    return this.http.get(`${this.API_URI}/ticket`);
  }

  getTicket(id: string) {
    return this.http.get(`${this.API_URI}/ticket/${id}`);
  }

  deletTicket(id: string | number) {
    return this.http.delete(`${this.API_URI}/ticket/${id}`);
  }
  saveTicket(ticket: Ticket) {
    return this.http.post(`${this.API_URI}/ticket`, ticket);
  }

  updateTicket(id: string | number, updateTicket: Ticket): Observable<Ticket> {
    return this.http.put(`${this.API_URI}/ticket/${id}`, updateTicket);
  }
}
