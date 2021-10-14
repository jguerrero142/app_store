"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var enviroments_1 = require("./global/enviroments");
var router_1 = __importDefault(require("./routes/router"));
var express_1 = __importDefault(require("express"));
var server = server_1.default.instance;
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
// server.app.use( cors({ origin: true, credentials: true, methods: ["GET","POST"]}));
server.app.use('/', router_1.default);
server.start(function () {
    console.log("Servidor corriendo " + enviroments_1.SERVER_PORT);
});
