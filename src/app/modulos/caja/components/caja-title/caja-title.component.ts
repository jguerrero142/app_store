import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/store.service';
import { User, Ticket } from 'src/app/shared/models/index.models';
import { StoreEffects } from '../../../../core/effects/Store.effect';
import { CajaService } from '../../services/caja.service';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-caja-title',
  templateUrl: './caja-title.component.html',
  styleUrls: ['./caja-title.component.css'],
})
export class CajaTitleComponent implements OnInit {
  //Variables Auth
  public role: string;
  public user: User;
  public valid: boolean = false;

  //Variables Componente
  public total: number = 0;
  public fiado: number = 0;
  public efectivo: number = 0;
  public ticket: Ticket[] = [];
  public almuerzo: number = 0;
  isLoadingOne = false;

  constructor(private storeServices: StoreService,
              private cajaService: CajaService) {
    
  }

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
  }

  ngOnInit(): void {
    this.getAuth();
    this.getStore();
  }

  getAuth() {
    this.storeServices.getStore.subscribe((d) => {
      if (d.user.id_user > 0) {
        this.user = d.user;
        this.role = d.user.role_user;
        this.valid = true;
      }
    });
  }

  closeBox(){
    this.cajaService.showConfirm();
  }

  getStore() {
    this.storeServices.getStore.subscribe((s) => {
      // Obtiene Total de almuerzos
      this.ticket = [];
      s.pedidos.map((d) => {
        if (d.pedido_estado == 1) {
          d.ticket.map((d) => {
            if(d.producto_tipo == 1){
              this.ticket.push(d);
            } 
          });
          
        }
      });
      this.almuerzo = this.ticket.length

      if (s.facturas.length > 0) {
        //Obtiene el TOTAL de VENTA
        const p = s.facturas.filter((d) => d.estado_factura == 3);
        this.total = p.reduce((suma, d) => suma + d.valor, 0);

        //Obtiene TOTAL de FIADO
        const f = s.facturas.filter((d) => d.estado_valor == 1 && d.estado_factura == 3);
        this.fiado = f.reduce((suma, d) => suma + d.valor, 0);

        //Obtiene TOTAL de EFECTIVO
        const e = s.facturas.filter((d) => d.estado_valor == 2 && d.estado_factura == 3);
        this.efectivo = e.reduce((suma, d) => suma + d.valor, 0);
      }
    });
  }
}
