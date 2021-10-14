"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
exports.router.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
exports.router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
exports.default = exports.router;
