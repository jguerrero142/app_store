import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'app-caja-home',
  templateUrl: './caja-home.component.html',
  styleUrls: ['./caja-home.component.css']
})
export class CajaHomeComponent implements OnInit {

  constructor( private cajaService: CajaService) { }

  ngOnInit(): void {}

}
