import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: any = [];
  user$: any = [];
  user: any = [];
  event: any = [];
  

  constructor(public auth: AuthService,
              public userServices: UsersService) { }

  ngOnInit(): void {
    this.validarUser();
  }
  validarUser(){
    this.auth.userProfile$.subscribe((perfil: User) => {
    this.user$ = perfil;
        if(this.user$){
        console.log(this.user$.sub);
        this.getUser();
     }
    })
  }
  getUser(){ 
    this.userServices.getUser(this.user$.sub)
    .subscribe(res => {
        this.user = res;
        this.id = this.user.id_user;
        console.log(this.id);
        
      },
      err => this.saveUser()
      
    )
  } 
  saveUser(){
    this.userServices.saveUser(this.user$)
      .subscribe(
        res => {
          console.log(res); 
        },
        err => console.log(err)
      ) 
  }
  newTicket(idx:string){
    this.event = idx;
      console.log(this.event)
  }

}
