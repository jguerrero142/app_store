import { Component, OnInit } from '@angular/core';

//Modales
import { Ticket, Pedido } from 'src/app/shared/models/index.models';

// Servicios
import { MenuService } from '../../services/menu-service.service';
import { PedidoService } from 'src/app/shared/services/pedido.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  isVisible = false;
  constructor(
    private menuServices: MenuService,
    public pedidoServices: PedidoService
  ) {}

  ngOnInit(): void {}

  //Agrega el pedido al dar clic en el boton.
  newPedido() {
    console.log('holi');
    // const value = this.totals[0];
    // this.pedido = {
    //   id_user: this.id,
    //   valor: value.Total,
    // };
    // console.log(this.pedido);
    // this.pedidoServices.savePedido(this.pedido).subscribe((res) => {
    //   this.idpedido = res;
    //   this.putEstado();
    // });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  //Asignamos true a todos los pedidos en false.
  // putEstado() {
  //   const pedido = 'true';
  //   this.menuServices
  //     .putEstado(this.idpedido.id, pedido)
  //     .subscribe((res) => {});
  // }
}
