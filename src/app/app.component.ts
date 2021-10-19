import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { StoreService } from './core/store.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  
  

  constructor( private auth: AuthService,
               private store: StoreService
               ) { }
    ngOnInit(){
      this.store.getAuth();
      this.auth.localAuthSetup();
    }

}
  

