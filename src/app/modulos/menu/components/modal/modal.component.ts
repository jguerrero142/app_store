import { Component, OnInit } from '@angular/core';


// Modales
import { Pedido, Producto, User } from 'src/app/modulos/shared/models/index.models';

// Servicios
import { MenuService } from '../../services/menu-service.service';
import { StoreService } from 'src/app/core/store.service';
import { StoreEffects } from 'src/app/core/effects/Store.effect';
import { MetodoPago } from '../../../shared/models/Metodo-pago';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  // Obtiene id USER
  public idUser: number;
  public role: number;
  public user: User;
  public users: User[] = [];
  public client = 0;
  

  // Variables obetiene tickets
  public tickets: Producto[] = [];
  public pedido: Pedido;
  public total: number;
  public metodos: MetodoPago[] = [];
  public idMetodo: number = 1;

  isDisabled = false;
  switchValue = false;
  switchValue2 = false;
  loading = false;
  isVisible = false;
  isVisible2 = false;
  isVisible3 = false;
  isLoadingTwo = false;
  inputValue: string | null = null;
  textValue: string | null = null;

  constructor(
    public menuServices: MenuService,
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
        this.user = data.user;
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
      this.users = d.users.filter(user =>user.role == 3);
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
        // if(this.switchValue && this.user.contacto == null){
        //   this.isVisible3 = true;
        // }else if(!this.switchValue){
        //   this.isVisible3 = false;
        // }
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
      this.isVisible = false;
      this.tickets = [];
      this.menuServices.DeletTickets = this.tickets;
    }else{
      this.showMetodo();
    }
    
  }

  showMetodo(){
    this.isVisible2 = true;
    this.storeService.getStore.subscribe(m=>{
      this.metodos = m.metodos.filter(d=> d.id_metodo > 1);
    });
  }

  setFactura(){
    this.storeEffects.setFacturar(this.total,this.tickets,this.switchValue,this.idMetodo);
    this.isVisible = false;
    this.isVisible2 = false;
    this.tickets = [];
    this.menuServices.DeletTickets = this.tickets;
  }

  clickSwitch2(id?: number): void {
    if (!this.loading && this.isDisabled == false) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue2 = !this.switchValue2;
        if(this.switchValue2){
          this.idMetodo = id;
          console.log(this.idMetodo)
        }
        this.isDisabled = true;
        this.loading = false;
      }, 1000);
    }
  }


  handleCancel(): void {
    this.isVisible = false;
    this.isLoadingTwo = false;
  }
  handleCancel2(): void {
    this.isVisible2 = false;
    this.isDisabled = false;
    this.switchValue2 = !this.switchValue2;
    this.idMetodo = 1
  }

  handleCancel3(): void {
    this.isVisible3 = false;
  }

  
}
