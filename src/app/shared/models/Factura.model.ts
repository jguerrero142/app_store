export interface Factura {
    id_factura?: number;
        id_user?: number;
        id_pedido?: number;
        valor?: number;
        estado?: boolean;
        create_at?: string;
        observacion?: string;
}