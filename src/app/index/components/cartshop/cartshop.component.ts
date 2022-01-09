import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-cartshop',
  templateUrl: './cartshop.component.html',
  styleUrls: ['./cartshop.component.css']
})
export class CartshopComponent implements OnInit {

  constructor(public auth: AuthService) { console.log("carshop")}

  ngOnInit(): void {
  }

}
