import { Component, OnInit, ViewChild } from '@angular/core';

//Servicios
import { AuthService } from '../../core/auth/auth.service';

//Angular Material
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav

  //Variable Auth0
  role: number;
  user: any;
  id: any;


  constructor( public auth: AuthService,
               public userServices: UsersService,
               private observer: BreakpointObserver
    ) { }

  ngOnInit(): void {
    this.getId();
    this.getRole();
  }
  getRole(){
    this.userServices.roleS
    .subscribe(res =>{
      this.role = res;
      console.log(this.role);
    })
  } 
  getId(){
    this.userServices.userSID
    .subscribe(res =>{
      this.id = res;
      console.log(this.id);
    })
  } 

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 700px)'])
    .subscribe((res) => {
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}
