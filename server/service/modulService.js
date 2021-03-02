const db = require('../db/database');
const url = "https://localhost:8888/";
class modulService {
    constructor() { }
    getModuls(id) {
        return new Promise((resolve, reject) => {
            let conn = this.db.getConnection();
            let sql =
                "SELECT notes.nota, notes.id_assig, assignatura.cod_assig, assignatura.nom_assig, assignatura.modul , assignatura.curs, assignatura.hores " +
                "FROM notes, assignatura " +
                "WHERE notes.id_profe = ? AND notes.id_assig = assignatura.id_assig" +
                "ORDER BY notes.id_assig";

            conn.query(
                sql,
                [
                    id
                ],
                function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        var modulArr = [];
                        results.array.forEach(element => {
                            modulArr.push({
                                id_assig: element.id_assig,
                                cod_assig: element.cod_assig,
                                nom_assig: element.nom_assig,
                                modul: element.modul,
                                curs: element.curs,
                                hores: element.hores
                            });
                        });
                        resolve(modulArr);
                    }

                }
            );
        });
    }
    getModulByID(id, id_assig) {
        return new Promise((resolve, reject) => {
            let conn = this.db.getConnection();
            let sql =
                "SELECT notes.id_alumne, users.full_name,assignatura.id_assig, assignatura.cod_assig, notes.nota" +
                "FROM notes, assignatura " +
                "WHERE notes.id_profe = ? AND notes.id_assig = assignatura.id_assig AND n.id_assig = ?" +
                "ORDER BY notes.id_assig";
            conn.query(
                sql,
                [
                    id, id_assig
                ],
                function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        var modulArr = [];
                        results.array.forEach(element => {
                            modulArr.push({
                                id_assig: element.id_assig,
                                cod_assig: element.cod_assig,
                                nom_assig: element.nom_assig,
                                modul: element.modul,
                                curs: element.curs,
                                hores: element.hores,
                                links: {
                                    assig:"GET "+url+"/assignatura/"+element.id_assig,
                                    alumne: "GET "+url+"/alumne/"+element.id_alumne
                                    //,nota: "PUT "+url+"/moduls/"+element.id_assig+"/"+element.id_alumne
                                }
                            });
                           
                            modulArr.push(element);
                        });
                        resolve(modulArr);
                    }

                }
            );
        });

    }
    
}

module.exports = {
    modulService: modulService,
};