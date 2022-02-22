const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "app_mensajeria"
});

connection.connect((error) => {
    if(error){
        console.log("el error de conexion es: " + error);
        return;
    }
    console.log("conectado a la Base de Datos")
});
module.exports = connection;