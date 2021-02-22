const express = require('express');
const usuarioService = require('./service/usuarioService')
const bodyParser = require('body-parser');
//const encrypt = require('./lib/crypto'); me da error no lo encuentra "crypto": "^1.0.1",
const jwt = require('jsonwebtoken');
const fs = require('fs');
const https = require('https');

const PORT = 1234;
let app = express();
app.use(bodyParser.json());
https.createServer({
    key: fs.readFileSync('./certificats/certiProves.key'),
    cert: fs.readFileSync('./certificats/certiProves.crt')
}, app).listen(PORT, () => {
    console.log('HTTPS Escolte al port ' + PORT);
});
//app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            //afegim les dates de la peticio
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.post('/register', (req, res) => {
    const { dni, usuario, nombreCompleto, avatar, password } = req.body;
    
    var us = new usuarioService.usuarioService;
    us.insertUsuario(req.body);
})
app.post('/login', (req, res) => { })