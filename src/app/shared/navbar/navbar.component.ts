import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Modelos
import { User } from '../models/index.models';

//Servicios
import { AuthService } from '../../core/auth/auth.service';
import { CoreService } from 'src/app/core/core.service';
import { UsersService } from 'src/app/shared/services/user.service';
import { Users } from '../Class/User.class';
import { __values } from 'tslib';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //Variable Navbar
  public isCollapsed = false;
  public sideWith: number;

  //Variable Auth0
  public role: number;
  public role$: any;
  public user: User;
  public id: any;
  public img: boolean = false;
  public data$: Observable<Users>;

  constructor(
    public auth: AuthService,
    public userServices: UsersService,
    private observer: BreakpointObserver,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.userServices.getAuth();
    this.getAuth();
  }

  getAuth() {
    this.data$ = this.coreService.userGetObs;
    this.userServices.roleS.subscribe((res) => {
      this.role = res;
      console.log(res);
      this.img = true;
    });
  }

  ngAfterViewInit() {
    this.sidenavObs();
  }

  sidenavObs() {
    this.observer.observe(['(max-width: 400px)']).subscribe((res) => {
      if (res.matches) {
        this.sideWith = 0;
      } else {
        this.sideWith = 180;
      }
    });
  }
}

// this.role$ = await this.coreService.roleGetObs;
//     console.log(this.role$);
