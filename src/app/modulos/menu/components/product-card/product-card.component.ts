import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { Producto } from 'src/app/shared/models/Producto';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { UsersService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/User';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() tipoPro: number;
  public productos: Producto[] = [];
  public resx: any ;
  public valid: boolean = false;

  //Variables Auth
  public role: number;
  public user: User;
  public id: any;


  //Variables del componente
  public ticket: any = [];
  constructor( public menuServices: MenuService,
               public ticketServices: TicketsService,
               public userServices: UsersService) { 
    
  }

  ngOnInit(): void {
    this.getTipoProductos();
    this.getAuth();
  }

  getAuth(){
    this.userServices.roleS.subscribe(res => {this.role = res;});
    this.userServices.userSID.subscribe(resp => {this.id = resp;});
    this.userServices.getUs.subscribe((usr: User) => {
      this.user = usr;
    });
  }

  getTipoProductos(){
    this.menuServices.getProductos(this.tipoPro)
    .subscribe( resp => {
      this.resx = resp
      if(this.resx){
        this.valid = true;
      }
      this.productos.push(this.resx)
    })
  }

  saveTicket(id: number){
    this.ticket = {
              user_ticket: this.id,
              producto: id,
          }       
    this.ticketServices.saveTicket(this.ticket)
    .subscribe(resp =>{this.menuServices.ticketAdd.emit(true); });
  }

}
