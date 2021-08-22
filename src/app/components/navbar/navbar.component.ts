import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from 'src/app/services/user.service';
import { User } from '../../models/User';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Variable Auth0
  role: number;
  user: any;
  id: any;

  constructor(public  auth: AuthService,
              public  userServices: UsersService
    ) {
     
     }
  
  panelOpenState = true;
  isCollapsed = false;

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
}
