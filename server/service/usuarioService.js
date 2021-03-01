const db = require('./../db/database');
const usuario = require('./../bean/Usuario');
const pass = "1234";
class usuarioService {
    constructor() { }



    insertUsuario(User) {
        return new Promise((res, rej) => {
            let mydb = new db.database();
            let conn = mydb.getConnection();
            let sql = "INSERT INTO users (username, password, full_name, avatar) VALUES (?, ?, ?, ?)";

            conn.query(
                sql,
                [
                    User.username,
                    User.password,
                    User.full_name,
                    User.avatar
                ],
                function (err, results) {



                    if (err) {
                        rej(err);//catch
                    } else {
                        res(results);//then
                    }

                }
            )
        });
    }

    isValid(username, passwoord) {
        return new Promise((res, rej) => {
            let mydb = new db.Database();
            let conn = mydb.getConnection();
            let sql = "SELECT id FROM users WHERE username = ? AND password = ?";
            con.query(sql, [username, password], function (err, results) {



                if (err) {
                    rej(err);//catch
                } else {
                    res(results);//then
                }
            })
        });
    }
}







module.exports = {
    usuarioService: usuarioService
}