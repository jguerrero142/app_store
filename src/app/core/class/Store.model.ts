import { Pedido, Factura, User,Producto,TipoProducto } from '../../shared/models/index.models';

export class Store{

    constructor(
        public user?: User,
        public users?: User[],
        public pedidos?: Pedido[],
        public facturas?: Factura[],
        
    ){}

}