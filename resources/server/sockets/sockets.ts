import { Socket } from 'socket.io';
import socketIO from 'socket.io';


const notes: [] = [];


export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string }) =>{
        console.log('mensaje recibido', payload);

        io.emit('nuevo-mensaje', payload);
    });
}
export const addnote = (cliente: Socket)=>{
    cliente.on('Cliente:newnote',(payload: {title:string, desc: string}) => {
        console.log('nueva nota',payload);
        notes.push
    });
}