import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/index.models';
import { StoreService } from 'src/app/core/store.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  public valid: boolean = false;

  //Variables Auth
  public role: string;
  public total: number = 0;
  public user: User;
  public id: any;

  constructor(private storeServices: StoreService) {}

  ngOnInit(): void {
    this.getAuth();
    this.getTotalReservas();
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

  getTotalReservas(){
    this.storeServices.getStore.subscribe(s=>{
      const p = s.user.pedido.filter(d=> d.pedido_estado == 1 )
      this.total = p.reduce((suma,d)=> suma + d.valor, 0);
    })
  }

  
}
