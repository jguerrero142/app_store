import { Pedido, Factura } from '../../shared/models/index.models'

export class Store{

    id_user?: number;
    sub?: string;
    name?: string;
    picture?: string;
    email?: string;
    created_at?: Date;
    given_name?: string;
    family_name?: string;
    nickname?: string;
    locale?: string;
    updated_at?: string;
    email_verified?: string;
    role?: number;
    id_empresa?: number;
    pedido?: Pedido[];
    factura?: Factura[];

}