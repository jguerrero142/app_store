import { Pedido, Factura, Producto, TipoProducto,User } from '../../shared/models/index.models'

export class adStore{

    constructor(
    public users?: User[],
    public pedidos?: Pedido[],
    public facturas?: Factura[],
    public productos?: Producto[],
    public menus?: Producto[],
    public tipo_producto?: TipoProducto[],
    ){}

    

}