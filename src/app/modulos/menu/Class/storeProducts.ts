import { Producto, TipoProducto } from 'src/app/modulos/shared/models/index.models';


export class StoreProducts {

    constructor(  public productos?: Producto [],
                  public tipoProducto?: TipoProducto [],
                  public tickets: Producto[] = []

      ){}

      // Obtenemos los PRODCUTOS con Menu true
      getMenu() {
        const menu = this.productos.filter( d => d.menu == true);
        return menu;
      }

      // Obtenemos el TOTAL de los Tickets
      getTotal(){
          const total = this.tickets.reduce((suma, d) => suma + d.valor, 0);
          return total;
      }


}
