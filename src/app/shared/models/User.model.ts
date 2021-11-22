import { Pedido, Factura } from '../../shared/models/index.models'

export class User {

    constructor(
        public id_user?: number,
        public sub?: string,
        public name?: string,
        public picture?: string,
        public email?: string,
        public id_role?: number,
        public role_user?: string,
        public created_at?: Date,
        public given_name?: string,
        public family_name?: string,
        public nickname?: string,
        public locale?: string,
        public updated_at?: string,
        public email_verified?: string,
        public contacto?:string,
        public role?: number,
        public id_empresa?: number,
        public name_enterprise?: string,
        public pedido?: Pedido[],
        public factura?: Factura[],
    ){ }
    
}