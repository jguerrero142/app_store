import { Pedido, Factura, User, MetodoPago } from '../../modulos/shared/models/index.models';

export class Store{

    constructor(
        public user?: User,
        public users?: User[],
        public pedidos?: Pedido[],
        public facturas?: Factura[],
        public metodos?: MetodoPago[],
        
    ){}

}