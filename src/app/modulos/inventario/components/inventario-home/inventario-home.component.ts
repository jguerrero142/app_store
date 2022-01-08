import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/store.service';

import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

import { User, Ticket, Factura } from 'src/app/modulos/shared/models/index.models';
import { Pedido } from '../../../shared/models/Pedido.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { StoreEffects } from '../../../../core/effects/Store.effect';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetodoPago } from '../../../shared/models/Metodo-pago';
interface Single {
  name: string;
  value: number;
}
@Component({
  selector: 'app-inventario-home',
  templateUrl: './inventario-home.component.html',
  styleUrls: ['./inventario-home.component.css'],
})
export class InventarioHomeComponent implements OnInit {
  view: any[] = [600, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  public single: Single[] = [];
  public facturas: Factura[] = [];
  public totalFiado: number;
  public totalEfectivo: number;
  public totalPagos: number;
  public metodoPago1: number;
  public metodoPago2: number;
  public totalVenta: number;

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
    private storeService: StoreService,
    public auth: AuthService,
    public storeServices: StoreService,
    public storeEffects: StoreEffects
  ) {
    this.storeService.getStore.subscribe((d) => {
      if (d.facturas.length > 0) {
        this.facturas = d.facturas;
        console.log(this.facturas);
        this.getTotalVentaGraf();
        this.getTotalContabilidad();
      }
    });
  }
  ngOnInit(): void {
    this.getAuth();
    this.getStore();
  }

  getTotalVentaGraf() {
    const fiado = this.facturas.filter((d) => d.estado_valor == 1);
    this.totalFiado = fiado.reduce((suma, d) => suma + d.valor, 0);
    const f = {
      name: 'Fiado',
      value: this.totalFiado,
    };
    this.single.push(f);

    const pago = this.facturas.filter((d) => d.estado_valor == 2);
    this.totalPagos = pago.reduce((suma, d) => suma + d.valor, 0);
    const e = {
      name: 'Pagos',
      value: this.totalPagos,
    };
    this.single.push(e);

    const efectivo = this.facturas.filter(
      (d) => d.estado_valor == 2 && d.id_metodo == 1
    );
    this.totalEfectivo = efectivo.reduce((suma, d) => suma + d.valor, 0);

    const metodo = this.facturas.filter(
      (d) => d.estado_valor == 2 && d.id_metodo == 2
    );
    this.metodoPago1 = metodo.reduce((suma, d) => suma + d.valor, 0);

    const m = this.facturas.filter(
      (d) => d.estado_valor == 2 && d.id_metodo == 3
    );
    this.metodoPago2 = m.reduce((suma, d) => suma + d.valor, 0);
    console.log(this.metodoPago2);
  }

  getTotalContabilidad() {
    this.totalVenta = this.totalFiado + this.totalPagos;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
        this.reservas = d.facturas.filter(
          (p) => p.estado_factura == 3 || p.estado_factura == 4
        );
        this.valid = true;
      }
    });
  }
}
