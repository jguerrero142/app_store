"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var enviroments_1 = require("../global/enviroments");
var http_1 = __importDefault(require("http"));
var socket = __importStar(require("../sockets/sockets"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = enviroments_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        });
        this.escucharSockets();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._intance || (this._intance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.escucharSockets = function () {
        var _this = this;
        console.log('escuchando conexiones - sockets');
        this.io.on('connection', function (cliente) {
            console.log('cliente conectado', cliente.id);
            socket.mensaje(cliente, _this.io);
            socket.desconectar(cliente);
            socket.addnote(cliente);
        });
    };
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback);
    };
    return Server;
}());
exports.default = Server;
// socketIO( this.httpServer);
