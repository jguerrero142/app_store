import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/store.service';
import { User, Ticket } from 'src/app/shared/models/index.models';

@Component({
  selector: 'app-caja-title',
  templateUrl: './caja-title.component.html',
  styleUrls: ['./caja-title.component.css']
})
export class CajaTitleComponent implements OnInit {

  public valid: boolean = false;

  //Variables Auth
  public role: string;
  public total: number = 0;
  public ticket: Ticket [] = [];
  public almuerzo: number;
  public user: User;
  public id: any;

  constructor( private storeServices: StoreService) {
    this.getadStore();
   }

  ngOnInit(): void {
    this.getAuth();
    
  }

  getAuth() {
    this.storeServices.getUser.subscribe((d) => {
      if (d.id_user > 0) {
        this.user = d;
        this.role = d.role_user;
        this.valid = true;
      }
    });
  }

  getadStore(){
    this.storeServices.getadStore.subscribe( s=>{
      if(s != null){

        //Obtiene los pedidos en CREADA
        const p = s.pedidos.filter(d=> d.pedido_estado == 1);
        this.total = p.reduce((suma, d) => suma + d.valor,0);

        // Obtiene Total de almuerzos
        p.map(d=> {
          const a = d.ticket.filter(d=> {
            if(d.producto_tipo == 1){
              this.ticket.push(d)
            }
          })
          
        })
        this.almuerzo = this.ticket.length
      }
      
    })
  }

}
