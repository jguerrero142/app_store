import { Component, OnInit } from '@angular/core';


// Modales
import { Pedido, Producto, User } from 'src/app/shared/models/index.models';

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
  public idUser: number;
  public role: number;
  public users: User[] = [];
  public client = 0;
  

  // Variables obetiene tickets
  public tickets: Producto[] = [];
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

  // Obtiene el usuario
  getAuth() {
    this.storeService.getStore.subscribe((data) => {
      if (data) {
        this.idUser = data.user.id_user;
        this.role = data.user.id_role;
      }
    });
  }

  // //Activa la vision de la mdoal
  showModal(): void {
    this.isVisible = true;
    this.getTickets();
    if (this.role == 5){
      this.getAllUser();
    }
  }

  // //Obtiene los TICKETS
  getTickets(){
    this.menuServices.getStore.subscribe(data =>{
        this.tickets = data.tickets;
        this.total = data.getTotal();
    })
  }

  // //Obtiene todos los usuarios
  getAllUser(){
    this.storeService.getStore.subscribe(d =>{
      this.users = d.users;
    })
  }

  // Agrega el Id de USUARIO cliente
  selectUser(id: number): void {
    this.client = id;
    console.log(this.client)
    this.isLoadingTwo = true;
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

  setPedidoUser(){
    this.storeEffects.setPedidoUser(this.total,this.tickets,this.switchValue);
    this.isVisible = false;
    this.tickets = [];
    this.menuServices.DeletTickets = this.tickets;
  }

  setPedido(){
    if (this.client > 0){
      this.storeEffects.setPedido(this.total,this.tickets,this.switchValue,this.client);
    }else{
      console.log("holi")
      this.storeEffects.setPedidoUser(this.total,this.tickets,this.switchValue);
    }
    this.isVisible = false;
    this.tickets = [];
    this.menuServices.DeletTickets = this.tickets;
  }

  // Al Clic en confirmar Oculta la modal
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isLoadingTwo = false;
  }
  
}
