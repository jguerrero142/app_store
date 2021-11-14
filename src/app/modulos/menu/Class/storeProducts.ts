import { Producto, TipoProducto } from 'src/app/shared/models/index.models';


export class StoreProducts {

    constructor(  public productos?: Producto [],
                  public tipoProducto?: TipoProducto [],
                  public tickets: Producto[] = []
                 
      ){}

      getMenu() {    
        const menu = this.productos.filter( d => d.menu == true);
        return menu; 
      }

      getTotal(){
          const total = this.tickets.reduce((suma, d) => suma + d.valor, 0);
          return total;
      }


}