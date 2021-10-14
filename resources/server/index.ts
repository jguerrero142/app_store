import Server from './classes/server';
import { SERVER_PORT } from './global/enviroments';
import router from './routes/router';
import express from 'express';




const server = Server.instance;

server.app.use(express.urlencoded({extended: true}));
server.app.use(express.json())

// server.app.use( cors({ origin: true, credentials: true, methods: ["GET","POST"]}));

server.app.use('/', router)

server.start (
    ()=>{
        console.log(`Servidor corriendo ${SERVER_PORT}`);
    }
)
