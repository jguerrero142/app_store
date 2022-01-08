import { Ticket } from './index.models';

export interface Pedido {
            
    id_pedido?: number;
    id_user?: number;
    valor?: number;
    created_at?: Date;
    value_pedido?: boolean;
    servicio?: boolean;
    metodo_pago?: number;
    estado_valor?: number;
    pedido_estado?: number;
    name?: string;
    user_update?: number,
    ticket?: Ticket[];

}
// export class Pedido {
//     constructor(
//         public id_pedido?: number,
//         public id_user?: number,
//         public valor?: number,
//         public created_at?: Date,
//         public value_pedido?: boolean,
//         public servicio?: boolean,
//         public estado_valor?: number,
//         public pedido_estado?: number,
//         public name?: string,
//         public ticket?: Ticket[],
//     ){}

// }


