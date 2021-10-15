export class Users {

    constructor (
        public id_user?: number,
        public sub?: string,
        public name?: string,
        public picture?: string,
        public email?: string,
        public created_at?: Date,
        public given_name?: string,
        public family_name?: string,
        public nickname?: string,
        public locale?: string,
        public updated_at?: string,
        public email_verified?: string,
        public role?: number,
        public id_empresa?: number,
    ){}
}