import { Component, OnInit, ViewChild } from '@angular/core';

//Servicios
import { AuthService } from '../../core/auth/auth.service';
import { CoreService, Users } from 'src/app/core/core.service';
import { Observable } from 'rxjs';

//Angular Material
import { BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from 'src/app/shared/services/user.service';
import { User } from '../models/User';

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
  public user: User;
  public id: any;
  public img: boolean = false;
  // private data$: Observable<User>;

  constructor( public auth: AuthService,
               public userServices: UsersService,
               private observer: BreakpointObserver,
               private coreService: CoreService
    ) { 
      // this.data$ =  coreService.userObservable;
      // const name = this.data$['source']['value'].name;
      // console.log(name);
    }

  ngOnInit(): void {
    this.userServices.getAuth();
    this.getAuth();    
  }

  
  getAuth(){
    this.userServices.roleS.subscribe(res => {this.role = res;});
    this.userServices.userSID.subscribe(resp => {this.id = resp;});
    this.userServices.getUs.subscribe((usr: User) => {
      this.user = usr;
      this.img = true;
      // this.coreService.userData = {name:'guerrero'};
      // this.data$ =  this.coreService.userObservable;
      // const name = this.data$['source']['value'].name;
      // console.log(name);
    });
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
