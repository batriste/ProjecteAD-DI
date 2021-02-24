const express = require('express');
const usuarioService = require('./service/usuarioService')
const alumneService = require('./service/alumneService')
const professorService = require('./service/professorService')
const Professor = require('./bean/Professor');
const Alumne = require('./bean/Alumne');
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
    var ps = new professorService.professorService;
    var as = new alumneService.alumneService;
    us.insertUsuario(req.body).then(resultado => {
        console.log(resultado);
        if (ps.isProfessor(req.body.dni) == 1) {//comrpovem que esta o no a la taula dni
            let profe = new Professor(resultado.id, req.body.dept);
            ps.insertProfessor(profe).then(result => {
                res.status(200).send({ ok: true, resultado: resultado });
            }).catch(result => {
                res.status(401).send({
                    ok: false,
                    error: "Error inserint profesor" + err
                })
            });
        } else {//inserim alumne
            let alumne = new Alumne(resultado.id, req.body.dept);
            as.insertAlumne(alumne).then(result => {
                res.status(200).send({ ok: true, resultado: resultado });//faltaria afegir el token
            }).catch(result => {
                res.status(401).send({
                    ok: false,
                    error: "Error inserint alumne" + err
                })
            });
        }

    }).catch(res => {
        res.status(401).send({
            ok: false,
            error: "Error inserint dades" + err
        })
    });

})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    var us = new usuarioService.usuarioService;
    us.isValid(username, password).then(result => {
        res.status(200).send({ ok: true, resultado: resultado });//coomprovar que va i no tenim que retornar una posicio concreta del row
    }).catch(res => {
        res.status(401).send({
            ok: false,
            error: err
        })
    });
})