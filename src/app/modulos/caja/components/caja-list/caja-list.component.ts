import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import { User, Ticket } from 'src/app/shared/models/index.models';
import { StoreService } from '../../../../core/store.service';
import { Pedido } from '../../../../shared/models/Pedido.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { MatAccordion } from '@angular/material/expansion';
import { StoreEffects } from '../../../../core/effects/Store.effect';
import { Factura } from '../../../../shared/models/Factura.model';

interface DataItem {
  name: string;
  age: number;
  address: string;
}


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn| null;
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
  styleUrls: ['./caja-list.component.css']
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
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Age',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Address',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
    }
  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
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
   public reservas: Pedido[] = [];
 

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
    this.storeServices.getUser.subscribe((d) => {
      if (d != null) {
        this.user = d;
        this.id = d.id_user;
        this.role = d.role_user;
      }
    });
  }

  getStore() {
    this.storeServices.getadStore.subscribe((d) => {
      if (d != null) {
        this.reservas = d.pedidos.filter( p => p.pedido_estado == 1);
        console.log(this.reservas)
        this.valid = true;
      }
    });
    
  }

  onExpandChange(data: Pedido , checked: boolean):void{
    if(checked){
      this.expandSet.add(data.id)
      this.ticket = data.ticket.filter(d=> d.id_pedido == data.id)
      console.log(this.ticket)
    }else{
      this.expandSet.delete(data.id)
    }
  }

  facturarPedido(id: any){
    console.log(id)
  }


}
