import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UsersService } from 'src/app/services/user.service';


//Angular Material
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


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

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav

  constructor( public auth: AuthService,
               public userServices: UsersService,
               private observer: BreakpointObserver
               ) {}

  

    ngOnInit(){
      this.auth.localAuthSetup();
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
  

