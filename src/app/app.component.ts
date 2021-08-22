import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/app/services/user.service';

import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  id: number;
  role: number;
  user$: any = [];
  user: any = [];

  constructor( private auth: AuthService,
               public userServices: UsersService
               ) {}

  isCollapsed = false;

    ngOnInit(){
      this.auth.localAuthSetup();
    }
     
    // validarUser(){
    //   this.auth.userProfile$.subscribe((perfil: User) => {
    //   this.user$ = perfil;
    //       if(this.user$){
    //       this.getUser();
    //    }
    //   })
    // }
    // getUser(){      
    //   this.userServices.getUser(this.user$.sub)
    //   .subscribe(res => {
        // this.role = this.userServices.role;
        // this.id = this.userServices.idUser
        // console.log(res);
        
          // this.user = res;
          // this.id = this.user.id_user;
          // this.role = this.user.role;
          // this.userServices.userSID.emit(this.id);
          // this.userServices.roleS.emit(this.role);
        
          // this.userServices.addUser({
          //   id_user: this.id,
          //   role: this.role,
          // });
    //   },
    //     err => this.saveUser());
    // } 
    // saveUser(){
    //   this.userServices.saveUser(this.user$)
    //     .subscribe(
    //       res => {
    //         console.log(res); 
    //       },
    //       err => console.log(err)
    //     ) 
    // }
}
  

