import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

//Angular Material
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav


  constructor( public auth: AuthService,
              private observer: BreakpointObserver
    ) { }

  ngOnInit(): void {
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
