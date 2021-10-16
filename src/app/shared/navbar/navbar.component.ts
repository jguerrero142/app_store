import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

//Modelos
import { User } from '../models/index.models';

//Servicios
import { AuthService } from 'src/app/core/auth/auth.service';
import { CoreService } from 'src/app/core/core.service';

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
  
  //Valida vista de usuario
  public img: boolean = false;
  

          constructor(
            public auth: AuthService,
            private observer: BreakpointObserver,
            private coreService: CoreService
          ) {}

  ngOnInit(): void {
    this.getAuth();
  }
  

  getAuth() {
    this.coreService.getUser.subscribe(data =>{
      if(data){
        this.user = data;
        this.role = data.role;
        this.img = true;
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
        this.sideWith = 180;
      }
    });
  }
}
