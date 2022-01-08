import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import { User, Ticket, Factura } from 'src/app/modulos/shared/models/index.models';
import { StoreService } from '../../../../core/store.service';
import { Pedido } from '../../../shared/models/Pedido.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { StoreEffects } from '../../../../core/effects/Store.effect';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetodoPago } from '../../../shared/models/Metodo-pago';

@Component({
  selector: 'app-caja-factura',
  templateUrl: './caja-factura.component.html',
  styleUrls: ['./caja-factura.component.css']
})
export class CajaFacturaComponent implements OnInit {
  public ticket: Ticket[] = [];
  public expandSet = new Set<number>();
  
  public displayedColumns: string[] = ['Producto', 'Valor'];

   //Variables Auth
   public role: string;
   public user: User;
   public id: any;

   public valid: boolean = false;
   public alert: boolean = false;
   public reservas: Factura[] = [];
   public factura: Pedido;
   public metodos: MetodoPago[] = [];
   public idMetodo: number = 0;


   public r$: Observable<Pedido[]>;
   public isLoadingOne = false;
   public isVisible = false;
   public isDisabled = false;
   public switchValue = false;
   public loading = false;

  constructor(
    public auth: AuthService,
    public storeServices: StoreService,
    public storeEffects: StoreEffects
  ) { }

  ngOnInit(): void {
    this.getAuth();
    this.getStore();
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

  loadStore(): void {
    this.storeServices.getLoadingStore(); 
    this.isLoadingOne = true;
    setTimeout(() => {
      this.getStore();
      this.isLoadingOne = false;
    }, 1000);
  }
    
  getStore() {
      this.storeServices.getStore.subscribe((d) => {
        if (d.facturas.length > 0) {
         this.reservas = d.facturas.filter( p => p.estado_factura == 3);
         this.valid = true;
        }
     }); 
  }

}
