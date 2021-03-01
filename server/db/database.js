var mysql=require('mysql');

class database{
    constructor(){}

    getConnection(){
        // Retorna una connexió a la BD MySQL
        return mysql.createConnection(
            {
            insecureAuth : true, 
            host     : '127.0.0.1',
            port     : '3307',
            user     : 'root',
            password : '1234',
            database : 'docencia'
          }); 
    }
}

module.exports = {
    database: database,
};