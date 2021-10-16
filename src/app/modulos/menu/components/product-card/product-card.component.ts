import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu-service.service';
import { Producto } from 'src/app/shared/models/Producto.model';
import { TicketsService } from 'src/app/shared/services/ticket.service';
import { User } from 'src/app/shared/models/index.models';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() tipoPro: number;
  public productos: Producto[] = [];
  public valid: boolean;
  public alert: boolean;

  //Variables Auth
  public role: number;
  public user: User;
  public id: any;
  public data: any;
  public pro: any;

  //Variables del componente
  public ticket: any = [];
  constructor(
    public menuServices: MenuService,
    public ticketServices: TicketsService,
    public coreService: CoreService
  ) {
    this.valid = false;
  }

  ngOnInit(): void {
    this.getProductos();
  }
  afterClose(): void {
    this.alert = false;
  }

  getAuth() {
    this.coreService.getUser.subscribe((d) => {
      if (d) {
        this.user = d;
        this.role = d.role;
        this.id = d.id_user;
      }
    });
  }

  getProductos() {
    this.menuServices.getProductos(this.tipoPro).subscribe((resp) => {
      this.data = resp;
      this.productos.push(this.data);
      this.pro = this.productos['0'];
      if (this.pro.length > 0) {
        console.log(this.productos[0]);
      } else {
        this.valid = true;
      }
    });
  }

  saveTicket(id: number) {
    this.getAuth();
    console.log(this.id, id);
    if (this.id) {
      this.ticket = {
        user_ticket: this.id,
        producto: id,
      };
      this.ticketServices.saveTicket(this.ticket).subscribe((resp) => {
        this.menuServices.ticketAdd.emit(true);
      });
    } else {
      this.alert = true;
    }
  }
}
