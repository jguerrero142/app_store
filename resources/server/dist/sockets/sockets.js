"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addnote = exports.mensaje = exports.desconectar = void 0;
var notes = [];
var desconectar = function (cliente) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
    });
};
exports.desconectar = desconectar;
var mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        console.log('mensaje recibido', payload);
        io.emit('nuevo-mensaje', payload);
    });
};
exports.mensaje = mensaje;
var addnote = function (cliente) {
    cliente.on('Cliente:newnote', function (payload) {
        console.log('nueva nota', payload);
        notes.push;
    });
};
exports.addnote = addnote;
