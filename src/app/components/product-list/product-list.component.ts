import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from '../../services/ticket.service';
import { Ticket } from '../../models/Ticket';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() user: number;
  

  tickets: any = [];
  new: any = [];

  constructor(public auth: AuthService,
              public ticketsService: TicketsService
              ) { }

  ngOnInit(): void {
    this.getTickets();
    this.newTicket();
  }
  getTickets(){
    this.ticketsService.getTickets().
    subscribe((resp: Ticket) =>{
      this.tickets = resp;
    })
  }
  newTicket(){
    this.ticketsService.newsTicket()
    .subscribe(res => {
      this.getTickets();
    })
  }
  deleteTicket(id: number){
    this.ticketsService.deletTicket(id).
    subscribe(res => {
      this.getTickets();
    })
  }
  
          
}