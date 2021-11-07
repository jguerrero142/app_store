import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/index.models';


//Servicios
import { ReservaService } from '../../services/reserva.service';
import { StoreService } from '../../../../core/store.service';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-reserva-home',
  templateUrl: './reserva-home.component.html',
  styleUrls: ['./reserva-home.component.css'],
})
export class ReservaHomeComponent implements OnInit {
  
  //Variables Auth
  public role: string;
  public user: User;
  public id: any;
  public valid: boolean = false;

  constructor(public auth: AuthService, 
              public reservaServices: ReservaService,
               public storeServices: StoreService
  ) {}

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth() {
    this.storeServices.getStore.subscribe((d) => {
      if (d != null) {
        this.valid = true;     
        this.user = d.user;
        this.id = d.user.id_user;
        this.role = d.user.role_user;
      }
    });
  }
  

  
}
