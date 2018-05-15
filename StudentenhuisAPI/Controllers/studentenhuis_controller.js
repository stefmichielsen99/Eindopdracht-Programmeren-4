
const database = require("../Database/databaseconnection");
const apiError = require("../ApiError");
const studentenhuis = require("../Models/Studentenhuis");
const AssertionError = require('assert').AssertionError;
const assert = require("assert");
const auth = require("../util/auth/authentication");
//getAllStudentenhuizen
function getAllStudentenhuizen(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            let sql = "SELECT * FROM studentenhuis";
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {
                if(error){
                    console.log(error);
                } else {
                    console.log(results);
                    res.status(200).json(results);
                }
            });
        }
    });

}

//getStudentenhuisById
function getStudentenhuisById(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            let sql = `SELECT * FROM studentenhuis WHERE ID = ${req.params.ID}`;
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {
            if(error){
                console.log(error);
            } else if(results.length < 1){
                res.status(404).json(new apiError("HuisId not found", 404));
            } else {
            console.log(results);
            res.status(200).json(results);
            }
        });
        }
    });
    
}
//deleteStudentenhuisById
function deleteStudentenhuisById(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            let sql = `DELETE FROM studentenhuis WHERE ID = ${req.params.ID}`;
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {
            if(error){
                console.log(error);
            } else if(results.affectedRows === 0){
            res.status(404).json(new apiError("HuisId not found", 404));
            } else {
            console.log(results);
            res.status(200).json("Succesfully deleted!");
            }
        });
        }
    });
}

//UpdateStudentenhuisById
function updateStudentenhuisById(req, res, next){


    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => { 
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            const Naam = req.body.Naam;
            const Adres = req.body.Adres;
        

            console.log(req.body);
            console.log(typeof Naam);
    
            try {
                let huis = new studentenhuis(Naam, Adres);
            } catch (error){
                console.log("error");
                res.status(412).json(new apiError("Wrong or missing element in body!", 412));
                return;
            }
            
        

            let sql = `UPDATE studentenhuis SET Naam = '` + Naam + `', Adres = '` + Adres + `' WHERE ID = ${req.params.ID}`; 
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {
                if(error){
                    res.json(error);
                    console.log(error);
                } else if (results.affectedRows === 0) {
                    res.status(404).json(new apiError("HuisID was not found", 404));
                } else {
                    res.status(200).json("Updated!");
                }
            });
        }
    });
        
}

 


//createStudentenhuis
function createStudentenhuis(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            const Naam = req.body.Naam;
            const Adres = req.body.Adres;
            const UserID = payload.sub.ID;
            
            console.log(req.body);
            console.log(typeof Naam);

            try {
                let huis = new studentenhuis(Naam, Adres);
            } catch (error){
                console.log("error");
                res.status(412).json(new apiError("Wrong or missing element in body!", 412));
                return;
            }


            let sql = "INSERT INTO studentenhuis (`Naam`, `Adres`, `UserID`) VALUES ('"+ Naam +"', '"+ Adres +"', '" + UserID +"')";
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {        
                if(error){
                console.log(error);
                } else {
                    res.status(200).json("Post was made...!");
                }
            });
        }
     });
}


module.exports.getAllStudentenhuizen = getAllStudentenhuizen;
module.exports.getStudentenhuisById = getStudentenhuisById;
module.exports.updateStudentenhuisById = updateStudentenhuisById;
module.exports.deleteStudentenhuisById = deleteStudentenhuisById;
module.exports.createStudentenhuis = createStudentenhuis;
