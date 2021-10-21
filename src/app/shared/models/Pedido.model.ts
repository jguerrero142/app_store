import { Ticket } from './index.models';

export interface Pedido {
    id?: number;
    id_user?: number;
    valor?: number;
    created_at?: Date;
    value_pedido?: boolean;
    servicio?: boolean;
    estado_valor?: number;
    pedido_estado?: number;
    ticket?: Ticket[];
}
