import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/index.models';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  public valid: boolean = false;

  //Variables Auth
  public role: number;
  public user: User;
  public id: any;

  constructor(public userServices: UsersService) {}

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth() {
    this.userServices.roleS.subscribe((res) => {
      this.role = res;
    });
    this.userServices.userSID.subscribe((resp) => {
      this.id = resp;
    });
    this.userServices.getUs.subscribe((usr: User) => {
      this.user = usr;
      console.log(this.user);
      this.valid = true;
    });
  }
}
