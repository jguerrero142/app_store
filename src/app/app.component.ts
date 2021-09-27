import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';





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

  

  constructor( public auth: AuthService,
               ) { }
    ngOnInit(){
      this.auth.localAuthSetup();
    }

}
  

