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
  public role: number;
  public total: number = 0;
  public user: User;
  public id: any;

  constructor(public storeServices: StoreService) {}

  ngOnInit(): void {
    this.getAuth();
    this.getTotalReservas();
  }

  getAuth() {
    this.storeServices.getUser.subscribe((d) => {
      if (d.id_user > 0) {
        this.user = d;
        this.role = d.role;
        this.valid = true;
      }
    });
  }

  getTotalReservas(){
    this.storeServices.getStore.subscribe(s=>{
      s.map(store => {
        this.total = store.pedido.reduce((suma,d)=> suma + d.valor, 0);
      })
    })
  }

  
}
