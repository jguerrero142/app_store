import { Component, OnInit } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';

//Modelos
import { User } from './shared/models/index.models';

//Servicios
import { AuthService } from 'src/app/core/auth/auth.service';
import { StoreService } from 'src/app/core/store.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   //Variable Navbar
   public isCollapsed = false;
   public sideWith: number;
 
   //Variable Auth0
   public user: User;
   public role: number;
   public valid: boolean = false;
   
   //Valida vista de usuario
   public img: boolean = false;
  
  

  constructor( private auth: AuthService,
               private observer: BreakpointObserver,
               private store: StoreService
               ) { }
    ngOnInit(){
      this.store.getAuth();
      this.auth.localAuthSetup();
    }

    ngAfterViewInit() {
      this.sidenavObs();
    }
  
    sidenavObs() {
      this.observer.observe(['(max-width: 400px)']).subscribe((res) => {
        if (res.matches) {
          this.sideWith = 0;
        } else {
          this.sideWith = 140;
        }
      });
    }

}
  

