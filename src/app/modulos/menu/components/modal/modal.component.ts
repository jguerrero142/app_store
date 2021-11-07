import { Component, OnInit } from '@angular/core';


//Modales
import { Ticket, Pedido, Producto, User } from 'src/app/shared/models/index.models';

// Servicios
import { MenuService } from '../../services/menu-service.service';
import { StoreService } from 'src/app/core/store.service';
import { StoreEffects } from 'src/app/core/effects/Store.effect';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  // Obtiene id USER
  public client: number = 0;
  public idUser: number;
  public users: User[] = [];
  public role: number;
  

  //Variables obetiene tickets
  public tickets: Producto[] = [];
  public ticket: Ticket;
  public pedido: Pedido;
  public total: number;
  

  switchValue = false;
  loading = false;
  isVisible = false;
  isLoadingTwo = false;

  constructor(
    private menuServices: MenuService,
    private storeEffects: StoreEffects,   
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getAuth();

  }

  //Obtiene el usuario
  getAuth() {
    this.storeService.getStore.subscribe((data) => {
      if (data) {
        this.idUser = data.user.id_user;
        this.role = data.user.id_role;
      }
    });
  }

  //Activa la vision de la mdoal
  showModal(): void {
    this.isVisible = true;
    this.getTicket();
      if(this.role == 5){
      this.getAllUser();
       }
  }

  //Obtiene los tickets en el array
  getTicket(){
    this.menuServices.getTickets.subscribe(data =>{
      if(data.length > 0){
        this.tickets = data;
        this.getTotal();
      }
            
    })
  }
  //Obtiene el total de arrayl
  getTotal(){
    this.menuServices.getTotal.subscribe( total =>{
      if(total > 0){
        this.total = total;
      }      
    })
  }

  //Captura el valor del servicio 
  clickSwitch(): void {    
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {        
        this.switchValue = !this.switchValue;
        this.loading = false;
      }, 1000);
    }
  }

  //Agrega el pedido al dar clic en el boton.
 
  loadTwo(id: number): void {
    this.client = id;
    this.isLoadingTwo = true;
  }

  sendPedido(){
    if(this.client > 0 ){
          this.pedido = {
          id_user: this.client,
          valor: this.total,
          servicio: this.switchValue
        }
    }else{
      this.pedido = {
        id_user: this.idUser,
        valor: this.total,
        servicio: this.switchValue,
        estado_valor: 2,
    }
  }
    
    this.storeEffects.sendPedidos(this.pedido,this.tickets,this.client);
    this.isVisible = false;
    this.tickets = []
    this.menuServices.resetTicket();
  }

  //Funciones de vista
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isLoadingTwo = false;
  }
  //Obtiene todos los usuarios
  getAllUser(){
    this.storeService.getStore.subscribe(d =>{
      this.users = d.users;
    })
  }
  
  
 
  
}
