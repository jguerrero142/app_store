import { Component, OnInit, Input } from '@angular/core';


//Modales
import { Ticket, Pedido, Producto, User } from 'src/app/shared/models/index.models';

// Servicios
import { MenuService } from '../../services/menu-service.service';
import { StoreService } from '../../../../core/store.service';
import { StoreEffects } from 'src/app/core/effects/Store.effect';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  // Obtiene id USER
  

  //Variables obetiene tickets
  public tickets: Producto[] = [];
  public ticket: Ticket;
  public pedido: Pedido;
  public total: number;
  public idUser: number;
  public users: User[] = [];
  public role: number;
  public value: boolean = false;

  switchValue = false;
  loading = false;
  isVisible = false;


  public selectedValue = null ;

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
    this.storeService.getUser.subscribe((data) => {
      if (data) {
        this.idUser = data.id_user;
        this.role = data.id_role;
        if(this.role == 5){
          this.getAllUser();
        }
      }
    });
  }

  //Activa la vision de la mdoal
  showModal(): void {
    this.isVisible = true;
    this.getTicket();
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
        console.log(this.switchValue)
        this.loading = false;
      }, 1000);
    }
  }

  //Agrega el pedido al dar clic en el boton.
  search(id:number){
    console.log(id)
    // if(id == this.idUser){
    //   this.value = 0
    // }else {
    //   this.value = id
    //   console.log(this.value)
    // }
    
}

  sendPedido(){
    if(this.role == 5 ){
          this.pedido = {
          id_user: this.idUser,
          valor: this.total,
          servicio: this.switchValue,
          estado_valor: 2,
        }
    }else{
      this.pedido = {
        id_user: this.idUser,
        valor: this.total,
        servicio: this.switchValue,
      }
    }
    
    this.storeEffects.sendPedidos(this.pedido,this.tickets);
    this.isVisible = false;
    this.tickets = []
    this.menuServices.resetTicket();
  }

  // sendPedidoUser(){
  //   this.pedido = {
  //     id_user: this.value,
  //     valor: this.total,
  //     servicio: this.switchValue
  //   }
  //   this.storeEffects.sendPedidos(this.pedido,this.tickets);
  //   this.isVisible = false;
  //   this.tickets = []
  //   this.menuServices.resetTicket();
  // }


  //Funciones de vista
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.value = false;
  }
  //Obtiene todos los usuarios
  getAllUser(){
    this.storeService.getadStore.subscribe(d =>{
      this.users = d.users;
      console.log(this.users)
    })
  }
  
  
 
  
}
