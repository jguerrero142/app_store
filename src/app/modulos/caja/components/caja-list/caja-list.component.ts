import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

import { User, Ticket } from 'src/app/shared/models/index.models';
import { StoreService } from '../../../../core/store.service';
import { Pedido } from '../../../../shared/models/Pedido.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { StoreEffects } from '../../../../core/effects/Store.effect';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetodoPago } from '../../../../shared/models/Metodo-pago';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

@Component({
  selector: 'app-caja-list',
  templateUrl: './caja-list.component.html',
  styleUrls: ['./caja-list.component.css'],
})
export class CajaListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true },
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some((name) => item.name.indexOf(name) !== -1),
    },
    {
      name: 'Age',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
    },
    {
      name: 'Address',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' },
      ],
      filterFn: (address: string, item: DataItem) =>
        item.address.indexOf(address) !== -1,
    },
  ];

  listOfParentData: ParentItemData[] = [];
  public ticket: Ticket[] = [];
  public expandSet = new Set<number>();

  public displayedColumns: string[] = ['Producto', 'Valor'];

  //Variables Auth
  public role: string;
  public user: User;
  public id: any;

  public valid: boolean = false;
  public alert: boolean = false;
  public reservas: Pedido[] = [];
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
  ) {}

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
      if (d.pedidos.length > 0) {
        this.reservas = d.pedidos.filter(
          (p) => p.pedido_estado == 1 || p.pedido_estado == 2
        );
        this.valid = true;
      }
    });
  }

  onExpandChange(data: Pedido, checked: boolean): void {
    if (checked) {
      this.expandSet.add(data.id_pedido);
      this.ticket = data.ticket.filter((d) => (d.id_pedido = data.id_pedido));
    } else {
      this.expandSet.delete(data.id_pedido);
    }
  }

  showModal(pedido: Pedido) {
    console.log(pedido);
    this.factura = pedido;
    this.idMetodo = 0;
    this.isVisible = true;
    this.storeServices.getStore.subscribe((m) => {
      this.metodos = m.metodos;
    });
  }

  setFactura(): void {
    const fact = this.storeEffects.setFacturaUser(
      this.factura.id_pedido,
      this.factura.id_user,
      this.factura.valor,
      this.idMetodo,
      this.factura.servicio
    );
    if (fact == true) {
      this.alert = true;
    } else {
      this.isVisible = false;
      this.isDisabled = false;
      this.alert = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isDisabled = false;
    this.alert = false;
    this.switchValue = !this.switchValue;
    this.idMetodo = 0;
  }

  clickSwitch(id?: number): void {
    if (!this.loading && this.isDisabled == false) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.idMetodo = id;
        console.log(this.idMetodo);
        this.isDisabled = true;
        this.loading = false;
      }, 1000);
    }
  }
}
