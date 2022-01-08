import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

//Modelos
import { User } from '../../shared/models/index.models';

//Servicios
import { AuthService } from 'src/app/core/auth/auth.service';
import { StoreService } from 'src/app/core/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //Variable Navbar
  public isCollapsed = false;
  public sideWith: number;

  //Variable Auth0
  public user: User;
  public role: number;
  public valid: boolean = false;
  
  //Valida vista de usuario
  public img: boolean = false;  

          constructor(
            public auth: AuthService,
            private observer: BreakpointObserver,
            private storeService: StoreService
          ) {}

  ngOnInit(): void {
    this.getAuth();
  }
  

  getAuth() {
    this.storeService.getStore.subscribe(data =>{
       if(data.user){
        this.user = data.user;
        this.role = data.user.id_role;
        if(data.user.id_role > 0 ){
          this.valid = true
        }
      }
    });
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
