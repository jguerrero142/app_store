export interface Producto {
    id?: number;
    name?: string;
    valor?: number;    
    create_at?: Date;
    image?: string;
    descripcion?: string;
    menu?:boolean;
}