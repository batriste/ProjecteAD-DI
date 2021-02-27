const db = require('./../db/database');
const alumne = require('./../bean/Alumne');
class alumneService {

    constructor() { }
    insertAlumne(Alumne) {
        return new Promise((resolve, reject) => {
        let conn = this.db.getConnection();
        let sql =
            "INSERT INTO alumne (id_alumne, repetidor, curs) VALUES (?, ?, ?)";

        conn.query(
            sql,
            [
                Alumne.id_alumne,
                Alumne.repetidor,
                Alumne.curs
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
    alumneService: alumneService,
};