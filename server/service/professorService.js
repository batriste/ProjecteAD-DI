const db = require('../db/database');
const professor = require('../bean/Professor');

class professorService {

    constructor() { }
    insertProfessor(Professor) {
        let mydb = new db.Database();
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

                return new Promise((resolve, reject) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                })
            }
        )
    }
    isProfessor(dni){
        let conn = this.db.getConnection();
        let sql =
            "SELECT count(dni) FROM dni_profe WHERE dni = ?";

        conn.query(
            sql,
            [
                dni
            ],
            function (err, results) {

                return new Promise((resolve, reject) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                })
            }
        )
    }
}

module.exports = {
    professorService:professorService,
};