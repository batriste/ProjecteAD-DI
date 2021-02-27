const db = require('./../db/database');
const professor = require('./../bean/Professor');

class professorService {

    constructor() { }
    insertProfessor(Professor) {
        return new Promise((resolve, reject) => {
            let mydb = new db.database();
            let conn = mydb.getConnection();
            let sql =
                "INSERT INTO professor (id_professor, departament) VALUES (?, ?)";

            conn.query(
                sql,
                [
                    Professor.id_professor,
                    Professor.departament
                ],
                function (err, results) {



                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }

                }
            )
        })
    }
    isProfessor(dni) {
        return new Promise((resolve, reject) => {
            let conn = this.db.getConnection();
            let sql =
                "SELECT count(dni) FROM dni_profe WHERE dni = ?";

            conn.query(
                sql,
                [
                    dni
                ],
                function (err, results) {



                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }

                }
            )
        })
    }
}

module.exports = {
    professorService: professorService,
};