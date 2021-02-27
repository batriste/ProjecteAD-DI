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
//Si toquem el port tenim que tocar el archiu ./../client/src/boot/axios.js
const PORT = 6969;
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
    const {  username, password, full_name, avatar, dni  } = req.body;

    var us = new usuarioService.usuarioService;
    var ps = new professorService.professorService;
    var as = new alumneService.alumneService;
    us.insertUsuario(req.body).then(resultado => {
        console.log(resultado);
        if (ps.isProfessor(req.body.dni) == 1) {//comrpovem que esta o no a la taula dni
            let profe = new Professor(resultado.id, req.body.dept);
            ps.insertProfessor(profe).then(result => {
                const tokenAuth = jwtAuth.jwt.sign({
                    user_id:profe.id_professor,
                    username:username,
                    role:'profe'
                }, jwtAuth.accessTokenSecret, {expiresIn: '2h'});
                const refreshToken = jwtAuth.jwt.sign({
                    user_id: profe.id_professor,
                    username:username,
                    role:'profe'
                }, jwtAuth.refreshTokenSecret);  
                jwtAuth.refreshTokens.push(refreshToken);
                                
                // Token afegit
                res.status(200).send({
                    ok:true,
                    data: {
                        tokenAuth: tokenAuth,
                        refreshToken: refreshToken,
                        avatar: avatar
                    }
                });
            }).catch(err => {
                res.status(401).send({
                    ok: false,
                    error: "Error inserint profesor" + err
                })
            });
        } else {//inserim alumne
            let alumne = new Alumne(resultado.id, req.body.dept);
            as.insertAlumne(alumne).then(result => {
                // fem el token de alumne abans de enviarlo
                const tokenAuth = jwtAuth.jwt.sign({
                    user_id:alumne.id_alumne,
                    username:username,
                    role:'alumne'
                }, jwtAuth.accessTokenSecret, {expiresIn: '2h'});
                const refreshToken = jwtAuth.jwt.sign({
                    user_id: alumne.id_alumne,
                    username:username,
                    role:'alumne'
                }, jwtAuth.refreshTokenSecret);
                jwtAuth.refreshTokens.push(refreshToken);
                                
                //  Token afegit
                res.status(200).send({
                    ok:true,
                    data: {
                        tokenAuth: tokenAuth,
                        refreshToken: refreshToken,
                        avatar: avatar
                    }
                });
                
            }).catch(err => {
                res.status(401).send({
                    ok: false,
                    error: "Error inserint alumne" + err
                })
            });
        }
    }).catch(err => {
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