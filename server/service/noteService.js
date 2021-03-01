const db = require('../db/database');

class noteService {

    constructor() { }
    getNotes(id) {
        return new Promise((resolve, reject) => {
            let conn = this.db.getConnection();
            let sql =
                "SELECT notes.nota, notes.id_assig, assignatura.cod_assig, assignatura.nom_assig " +
                "FROM notes, assignatura " +
                "WHERE notes.id_alumne = ? AND notes.id_assig = assignatura.id_assig" +
                "ORDER BY n.id_assig";

            conn.query(
                sql,
                [
                    id
                ],
                function (err, results) {



                    if (err) {
                        reject(err)
                    } else {
                        var notesArr = [];
                        results.array.forEach(element => {
                            notesArr.push({
                                nota: element.nota,
                                id_assig: element.id_assig,
                                cod_assig: element.cod_assig,
                                links: {
                                    get:
                                        " GET https://localhost:6969/assignatures/" + element.id_assig,
                                }
                            });
                        });
                        resolve(notesArr);
                    }

                }
            )
        });
    }
    getNotesByID(id, id_assig) {
        return new Promise((resolve, reject) => {
            let conn = this.db.getConnection();
            let sql =
                "SELECT notes.nota, notes.id_assig, assignatura.cod_assig, assignatura.nom_assig " +
                "FROM notes, assignatura " +
                "WHERE notes.id_alumne = ? AND notes.id_assig = assignatura.id_assig AND notes.id_assig = ?" +
                "ORDER BY n.id_assig";

            conn.query(
                sql,
                [
                    id,
                    id_assig
                ],
                function (err, results) {



                    if (err) {
                        reject(err);
                    } else {
                        var notesArr = [];
                        results.array.forEach(element => {
                            notesArr.push({
                                nota: element.nota,
                                id_assig: element.id_assig,
                                cod_assig: element.cod_assig,
                                links: {
                                    get:
                                        " GET https://localhost:6969/assignatures/" + element.id_assig,
                                }
                            });
                        });
                        if (notesArr.length == 0){
                            resolve("No estas matriculalt");
                        }
                        else {
                            resolve(notesArr);
                        }
                    }

                }
            )
        });
    }
}

module.exports = {
    noteService: noteService,
};