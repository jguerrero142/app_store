import { Component, OnInit } from '@angular/core';
import { ApiTipoPro } from 'src/app/modulos/shared/interface';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  public tipos: ApiTipoPro[] = [];
  public valid: boolean = false;
  constructor(private service: IndexService) {
    this.getTipos();
   }

  ngOnInit(): void {
  }

  getTipos(){
    this.service.getTipoProducts()
    .subscribe( resp => {
      this.tipos = resp;
      this.valid = true;
    })
  }
}
