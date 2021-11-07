export class Ticket {
  constructor(
    public id_ticket?: number,
    public user_ticket?: number,
    public Producto?: number,
    public created_at?: Date,
    public id_pedido?: number,
    public estado?: true,
    public name?: string,
    public valor?: number,
    public descripcion?: string,
    public image?: string,
    public producto_tipo?: number,
  ){}
}
