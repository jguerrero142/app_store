export class Producto {

    

    constructor(public id?: number,
                public name?: string,
                public valor?: number,
                public create_at?: Date,
                public image?: string,
                public descripcion?: string,
                public producto_tipo?: number,
                public menu?:boolean
                ){ }
}