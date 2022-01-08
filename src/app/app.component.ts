import { Component, OnInit } from '@angular/core';

//Servicios
// import { AuthService } from 'src/app/core/auth/auth.service';
// public auth: AuthService


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   constructor( ) { }
    ngOnInit(){
      // this.auth.localAuthSetup();
    }


}
  

