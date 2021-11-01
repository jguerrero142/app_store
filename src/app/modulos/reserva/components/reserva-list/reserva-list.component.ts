import { Component, OnInit, ViewChild } from '@angular/core';



import { User, Pedido, Factura } from 'src/app/shared/models/index.models';
import {MatAccordion} from '@angular/material/expansion';


import { ReservaService } from '../../services/reserva.service';
import { StoreService } from '../../../../core/store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { StoreEffects } from '../../../../core/effects/Store.effect';




@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css'],
})


export class ReservaListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['Producto', 'Valor'];

  
  
  
  //Variables Auth
  public role: string;
  public user: User;
  public id: any;

  public valid: boolean = false;
  public reservas: Pedido[] = [];

  constructor(
    public auth: AuthService,
    public reservaServices: ReservaService,
    public storeServices: StoreService,
    public storeEffects: StoreEffects
  ) {}

  ngOnInit(): void {
    this.getAuth();
    this.getStore();
  }
  
  getAuth() {
    this.storeServices.getUser.subscribe((d) => {
      if (d != null) {
        this.user = d;
        this.id = d.id_user;
        this.role = d.role_user;
      }
    });
  }

  getStore() {
    this.storeServices.getStore.subscribe((d) => {
      if (d != null) {
        this.reservas = d.pedido.filter( p => p.pedido_estado == 1);
        this.valid = true;
      }
    });
    
  }
  deletPedido(index:number,pedido:number){
    this.reservaServices.getStatdoPedido(pedido)
    .subscribe(res => {
      if(res == 1){
        this.reservaServices.deleteConfirm(index, pedido);
      }
      else{
          this.reservaServices.warningState();
      }
    })
  }

  facturarPedido(pedido: Factura){
    this.storeEffects.setFactura(pedido)
    console.log(pedido)

  }
}
