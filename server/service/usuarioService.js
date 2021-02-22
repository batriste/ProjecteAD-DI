const db = require('../db/database');
const usuario = require('../bean/Usuario');

class usuarioService{
    mydb = new db();
    constructor(){}
   


    insertUsuario(User) {
        let conn = this.db.getConnection();
        let sql = "INSERT INTO users (username, password, full_name, avatar) VALUES (?, ?, ?, ?, ?)";

        conn.query(
            sql,
            [
                User.username,
                User.password,
                User.full_name,
                User.avatar
            ],
            function (err, results) {

                return new Promise((res, rej) => {

                    if (err) {
                        rej(err)
                    } else {
                        res(results)
                    }
                })
            }
        )

    }


}







module.exports = {
    usuarioService: usuarioService
}