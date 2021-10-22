import { Component, OnInit, Input } from '@angular/core';

//Modales
import { Ticket, Pedido, Producto } from 'src/app/shared/models/index.models';

// Servicios
import { MenuService } from '../../services/menu-service.service';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { StoreService } from '../../../../core/store.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  // Obtiene id USER
  @Input() idUser: number;

  //Variables obetiene tickets
  public tickets: Producto[] = [];
  public ticket: Ticket;
  public pedido: Pedido;
  public total: number;

  switchValue = false;
  loading = false;
  isVisible = false;

  constructor(
    private menuServices: MenuService,
    public pedidoServices: PedidoService,
    private ticketServices: TicketsService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    
  }

  showModal(): void {
    this.isVisible = true;
    this.getTicket();
  }

  getTicket(){
    this.menuServices.getTickets.subscribe(data =>{
      if(data.length > 0){
        this.tickets = data;
        this.getTotal();
      }
            
    })
  }

  getTotal(){
    this.menuServices.getTotal.subscribe( total =>{
      if(total > 0){
        this.total = total;
      }      
    })
  }

  clickSwitch(): void {    
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {        
        this.switchValue = !this.switchValue;
        console.log(this.switchValue)
        this.loading = false;
      }, 1000);
    }
  }

  //Agrega el pedido al dar clic en el boton.
  private pedidox: Pedido[] = [];


  sendPedido(){
    this.pedido = {
      id_user: this.idUser,
      valor: this.total,
      servicio: this.switchValue,
      ticket: this.tickets
    }
    
    this.storeService.sendPedido = this.pedido
    this.isVisible = false;
    this.tickets = []
    this.menuServices.setTicket();
    
  }





  setPedido(){
    
    this.pedido = {
      id_user: this.idUser,
      valor: this.total,
      servicio: this.switchValue,
    }
    this.pedidoServices.savePedido(this.pedido).subscribe(id => {
      const pedido = id['id']
        this.tickets.map( d=> {
          this.ticket = {
            user_ticket: this.idUser,
            Producto: d.id,
            id_pedido: pedido
          }
          this.ticketServices.saveTicket(this.ticket).subscribe(resp =>
            {
              this.isVisible = false;
              this.tickets = []
              this.menuServices.setTicket();
            }
          );
        })
      });
  }
  
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
