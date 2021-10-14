export interface Treserva{
    
}

export interface Reserva {
    id?: number;
    created_at?: Date;
    valor?: number;
    id_user?: number;   
    tickets: Treserva;  
}