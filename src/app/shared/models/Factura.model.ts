export class Factura {
        constructor(
        public id_factura?: number,
        public id_user?: number,
        public id_pedido?: number,
        public valor?: number,
        public observacion?: string,
        ){}
}