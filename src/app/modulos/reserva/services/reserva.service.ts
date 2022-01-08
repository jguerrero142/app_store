import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

//Modales
import { Pedido, Ticket } from 'src/app/modulos/shared/models/index.models';
import { environment } from 'src/app/shared/http/environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';

//Servicios
import { StoreService } from 'src/app/core/store.service';
import { StatePedido } from '../models/pedido.state';
import { StoreEffects } from 'src/app/core/effects/Store.effect';


@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  public pedidos: Pedido[] = []
  public tickets: Ticket[] = []
  public user: number;

  public valid: boolean = false;
  public reservas: Pedido[] = [];

  API_URI = environment.wsUrl;  

  constructor(private http: HttpClient,
              private storeServices: StoreService,
              private storeEffects: StoreEffects,
              private modal: NzModalService) 
              {
                
                this.getAuth();
              }

   getAuth() {
    this.storeServices.getStore.subscribe((d) => {
      if (d.user.id_user > 0 ) {          
        this.user = d.user.id_user;
      }
    });
  }

  getStatePedido(id: number){
      return this.http.get<StatePedido>(`${this.API_URI}/pedido/state/${id}`)
      .pipe(map(d => d.pedido_estado ))
    
  }

  warningState(): void {
    this.modal.warning({
      nzTitle: 'Esta reserva ya esta en proceso',
      nzContent: 'Por favor comunicate al restaurante...'
    });
  }

  deleteConfirm(index:number,pedido:number): void {
    this.modal.confirm({
      nzTitle: 'Deseas Cancelar La Reserva?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.storeEffects.deletePedidos(index,pedido),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  
}
