import { Component, OnInit, ViewChild } from '@angular/core';



import { User, Pedido, Factura } from 'src/app/modulos/shared/models/index.models';
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
  public facturas: Factura[] = [];

  constructor(
    public auth: AuthService,
    public reservaServices: ReservaService,
    public storeServices: StoreService,
    public storeEffects: StoreEffects
  ) {}

  ngOnInit(): void {
    this.getAuth();
    this.getStore();
    this.getFacturasUser();
  }
  
  getAuth() {
    this.storeServices.getStore.subscribe((d) => {
      if (d != null) {
        this.user = d.user;
        this.id = d.user.id_user;
        this.role = d.user.role_user;
      }
    });
  }

  getStore() {
    this.storeServices.getStore.subscribe((d) => {
      if (d != null) {
        this.reservas = d.user.pedido.filter( p => p.pedido_estado == 1 || p.pedido_estado == 2);
        this.valid = true;
      }
    });
    
  }

  getFacturasUser(){
    this.storeServices.getStore.subscribe( d=>{
      this.facturas = d.user.factura.filter(d => d.estado_factura == 3 || d.estado_factura == 4) ;
    })
  }

  deletPedido(index:number,pedido:number){
    this.reservaServices.getStatePedido(pedido)
    .subscribe(res => {
      if(res == 1){
        this.reservaServices.deleteConfirm(index, pedido);
      }
      else{
          this.reservaServices.warningState();
      }
    })
  }
}
