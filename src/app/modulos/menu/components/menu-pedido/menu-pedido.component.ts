import { Component, OnInit } from '@angular/core';

// Interfaces
import { Producto} from 'src/app/modulos/shared/models/index.models';

// Servicios
import { AuthService } from 'src/app/core/auth/auth.service';
import { MenuService } from '../../services/menu-service.service';
import { StoreService } from 'src/app/core/store.service';


@Component({
  selector: 'app-menu-pedido',
  templateUrl: './menu-pedido.component.html',
  styleUrls: ['./menu-pedido.component.css'],
})
export class MenuPedidoComponent implements OnInit{
  //Variables Auth
  public id: number;
  public role: string;

  //Variables obetiene tickets
  public tickets: Producto[] = [];


  //Variable del valor total tickets
  public total: number;
  public texto: boolean = false;

  //Variable del componente
  public alert: boolean = false;

  constructor(
    public auth: AuthService,
    private menuServices: MenuService,
    public storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.getAuth();
    this.getTicket();
    this.getTotal();
    
  }

  //Obtenemos datos del USUARIO
  getAuth() {
    this.storeService.getStore.subscribe((data) => {
      if (data) {
        this.id = data.user.id_user;
        this.role = data.user.role_user;
      }
    });
  }

  //Obtenemos los TICKETS
  getTicket(){
    this.menuServices.getStore.subscribe(data =>{      
      this.tickets = data.tickets;
      this.getTotal();
    });
  }
   // Obtenemos el TOTAL
  getTotal(){
    this.total = this.menuServices.store.getTotal();
    if(this.total > 0){
      this.texto = true;
    }
    else{
       this.texto = false;
    }
  }
  
  //Eliminamos el TICKET del arreglo
  deleteTicket(id: number){
    this.menuServices.setDeletTickets = id;
    this.getTotal();
  }

  afterClose(): void {
    this.alert = false;
  }

}
