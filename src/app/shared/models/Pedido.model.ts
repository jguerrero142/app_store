import { Ticket } from './index.models';

export class Pedido {
    constructor(
        public id?: number,
        public id_user?: number,
        public valor?: number,
        public created_at?: Date,
        public value_pedido?: boolean,
        public servicio?: boolean,
        public estado_valor?: number,
        public pedido_estado?: number,
        public name?: string,
        public ticket?: Ticket[],
    ){ }
}
