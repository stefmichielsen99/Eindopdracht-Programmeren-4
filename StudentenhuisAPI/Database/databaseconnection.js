const mysql = require("mysql");


let connection = mysql.createConnection({
    //properties
    host:"localhost",
    user:"studentenhuis_user",
    password:"secret",
    database:"studentenhuis"
});

function connectToDB(){
    connection.connect((error)=>{
        if(error){
            console.log(error);
        } else {
            console.log("Connected to DB!");
        }
    });
};

module.exports.connectToDB = connectToDB;
