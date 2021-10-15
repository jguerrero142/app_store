import { Component, OnInit, ViewChild } from '@angular/core';

//Servicios
import { AuthService } from '../../core/auth/auth.service';
import { CoreService } from 'src/app/core/core.service';
import { Observable } from 'rxjs';

//Angular Material
import { BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from 'src/app/shared/services/user.service';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Users } from '../models/User.class';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  //Variable Navbar
  public isCollapsed = false;
  public sideWith: number;

  //Variable Auth0
  public role: number;
  public role$: User;
  public user: User;
  public id: any;
  public img: boolean = false;
  public data$: Observable<User>;
  

  constructor( public auth: AuthService,
               public userServices: UsersService,
               private observer: BreakpointObserver,
               private coreService: CoreService
    ) { }

  ngOnInit(): void {
    this.userServices.getAuth();
    this.getAuth();      
  }

  
   getAuth(){
    this.data$ =  this.coreService.userGetObs;
    console.log(this.data$)
    this.userServices.roleS.subscribe(res => {this.role = res;this.img = true;});
    
  }

  ngAfterViewInit(){
     this.sidenavObs();    
  }

  sidenavObs(){
    this.observer.observe(['(max-width: 400px)'])
    .subscribe((res) => {
      if(res.matches){
        this.sideWith = 0;
      } else{
        this.sideWith = 180;
      }
    });
  }

}
