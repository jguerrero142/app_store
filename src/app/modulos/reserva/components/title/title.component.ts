import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/index.models';
import { StoreService } from 'src/app/core/store.service';

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

  constructor(public storeService: StoreService) {}

  ngOnInit(): void {
      this.getAuth(); 
  }

  getAuth() {
      this.storeService.getUser.subscribe((d) => {
        if (d.id_user > 0 ) {          
          this.user = d;
          this.role = d.role;
          this.valid = true;
        }
      });
    
  }
}
