const express = require('express');
const usuarioService = require('./service/usuarioService')
const alumneService = require('./service/alumneService')
const professorService = require('./service/professorService')
const notesService = require('./service/noteService')
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
const creaTokenR = (id, username, esRole, avatar) => {
    const tokenAuth = jwtAuth.jwt.sign({
        user_id: id,
        username: username,
        role: esRole
    }, jwtAuth.accessTokenSecret, { expiresIn: '2h' });
    const refreshToken = jwtAuth.jwt.sign({
        user_id: profe.id_professor,
        username: username,
        role: esRole
    }, jwtAuth.refreshTokenSecret);
    jwtAuth.refreshTokens.push(refreshToken);
    res.status(200).send({
        ok: true,
        data: {
            tokenAuth: tokenAuth,
            refreshToken: refreshToken,
            avatar: avatar
        }
    });
};
app.post('/register', (req, res) => {
    const { username, password, full_name, avatar, dni } = req.body;

    var us = new usuarioService.usuarioService;
    var ps = new professorService.professorService;
    var as = new alumneService.alumneService;
    us.insertUsuario(req.body).then(resultado => {
        console.log(resultado);
        ps.isProfessor(req.body.dni).then(resu => {
            //comrpovem que esta o no a la taula dni
            if (resu.length() == 1) {
                let profe = new Professor(resultado, req.body.dept);
                ps.insertProfessor(profe).then(result => {
                    creaTokenR(profe.id_professor, username, 'profe', avatar);
                    // Token afegit

                }).catch(err => {
                    res.status(401).send({
                        ok: false,
                        error: "Error inserint profesor" + err
                    });
                });
            }
        }
        ).catch(arreu => {
            //inserim alumne
            let alumne = new Alumne(resultado.id, req.body.dept);
            as.insertAlumne(alumne).then(result => {
                // fem el token de alumne abans de enviarlo
                creaTokenR(alumne, username, 'alumne', avatar);

            }).catch(err => {
                res.status(401).send({
                    ok: false,
                    error: "Error inserint alumne" + err
                });
            });

        });

    }).catch(err => {
        res.status(401).send({
            ok: false,
            error: "Error inserint dades" + err
        });
    });

})
const creaTokenL = (id, username, esRole) => {
    const tokenAuth = jwtAuth.jwt.sign({
        user_id: id,
        username: username,
        role: esRole
    }, jwtAuth.accessTokenSecret, { expiresIn: '2h' });
    const refreshToken = jwtAuth.jwt.sign({
        user_id: profe.id_professor,
        username: username,
        role: esRole
    }, jwtAuth.refreshTokenSecret);
    jwtAuth.refreshTokens.push(refreshToken);
    res.status(200).send({
        ok: true,
        data: {
            tokenAuth: tokenAuth,
            refreshToken: refreshToken,
        }
    });
};
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    var us = new usuarioService.usuarioService;
    var ps = new professorService.professorService;

    us.isValid(username, password).then(result => {
        //comprovem si es profesor
        ps.getProfeById(result.id)
            .then(usuari => {
                if (result.length() == 0) {
                    var esProfe = 'alumne';
                } else {
                    var esProfe = 'profe';
                }
                creaTokenL(usuari, username, esProfe, avatar);
            })
            .catch(err => {
                res.status(402).send({
                    ok: false,
                    error: err
                });
            });

    }).catch(res => {
        res.status(401).send({//El login es incorrecte
            ok: false,
            error: err
        });
    });
})
app.get("/notes", authenticateJWT, (req, res) => {
    const { id, dni } = req.body;
    var ps = new professorService.professorService;
    var ns = new notesService.noteService;
    ps.isProfessor(dni).then(err => {
        res.status(401).send({//El login es incorrecte
            ok: false,
            error: "Es Profesor"
        });
    }).catch(resu => {
        msContentScript.getNotes(id).then(result => {
            res.status(201).send({
                result,
            });
        }).catch(erroret => {
            res.status(401).send({//El login es incorrecte
                ok: false,
                error: "Error al buscar notes"
            });
        });
    });


})
app.get("/notes", authenticateJWT, (req, res) => {
    const { id, dni } = req.body;
    var ps = new professorService.professorService;
    var ns = new notesService.noteService;
    ps.isProfessor(dni).then(err => {
        res.status(401).send({//El login es incorrecte
            ok: false,
            error: "Es Profesor"
        });
    }).catch(resu => {
        ns.getNotes(id).then(result => {
            res.status(201).send({
                result
            });
        }).catch(erroret => {
            res.status(401).send({//El login es incorrecte
                ok: false,
                error: "Error al buscar notes"
            });
        });
    });


})
app.get("/notes:id_Assig", authenticateJWT, (req, res) => {
    const { id, dni } = req.body;
    var id_assig = req.header.id_Assig;
    var ps = new professorService.professorService;
    var ns = new notesService.noteService;
    ps.isProfessor(dni).then(err => {
        res.status(401).send({//El login es incorrecte
            ok: false,
            error: "Es Profesor"
        })
    }).catch(resu => {
        ns.getNotesByID(id).then(result => {
            res.status(201).send({
                result
            });
        }).catch(erroret => {
            res.status(401).send({//El login es incorrecte
                ok: false,
                error: "Error al buscar notes"
            });
        });
    });
})

app.get("/moduls", authenticateJWT, (req, res) => {
    const { id, dni } = req.body;

    var ps = new professorService.professorService;
    var ms = new modulService.modulService;
    ps.isProfessor(dni).then(err => {

        ms.getModuls(id).then(result => {
            res.status(201).send({
                result
            });
        }).catch(erroret => {
            res.status(401).send({//El login es incorrecte
                ok: false,
                error: "Error al buscar moduls"
            });
        });
    }).catch(resu => {
        res.status(401).send({//El login es incorrecte
            ok: false,
            error: "Es alumne"
        });
    });
})

app.get("/moduls:id_Assig", authenticateJWT, (req, res) => {

    var id_assig = req.header.id_Assig;
    const { id, dni } = req.body;

    var ps = new professorService.professorService;
    var ms = new modulService.modulService;
    ps.isProfessor(dni).then(err => {

        ms.getModulsByID(id).then(result => {
            res.status(201).send({
                result
            });
        }).catch(erroret => {
            res.status(401).send({//El login es incorrecte
                ok: false,
                error: "Error al buscar moduls"
            });
        });
    }).catch(resu => {
        res.status(401).send({//El login es incorrecte
            ok: false,
            error: "Es alumne"
        });
    });
})
