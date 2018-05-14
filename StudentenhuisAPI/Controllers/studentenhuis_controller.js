const database = require("../Database/databaseconnection");
const apiError = require("../ApiError");

//getAllStudentenhuizen
function getAllStudentenhuizen(req, res){
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

//getStudentenhuisById
function getStudentenhuisById(req, res){
    
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
//deleteStudentenhuisById
function deleteStudentenhuisById(req, res){
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

//UpdateStudentenhuisById
function updateStudentenhuisById(req, res){
    const Naam = req.body.Naam;
    const Adres = req.body.Adres;
    const UserID = req.body.UserID; //moet uit de JWT token gehaald worden

    console.log(req.body);

    let sql = `UPDATE studentenhuis SET 'Naam' = ` + Naam + `, 'Adres' = ` + Adres + `WHERE ID = ${req.params.ID}`; 
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.status(200).json(results);
        }
    });
}

//createStudentenhuis
function createStudentenhuis(req, res){
    const Naam = req.body.Naam;
    const Adres = req.body.Adres;
    const UserID = req.body.UserID; //moet uit de JWT token gehaald worden

    console.log(req.body);

    let sql = "INSERT INTO studentenhuis (`Naam`, `Adres`) VALUES ('"+ Naam +"', '"+ Adres +"')";
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.status(200).json("Post was made...!");
        }
    });
}


module.exports.getAllStudentenhuizen = getAllStudentenhuizen;
module.exports.getStudentenhuisById = getStudentenhuisById;
module.exports.updateStudentenhuisById = updateStudentenhuisById;
module.exports.deleteStudentenhuisById = deleteStudentenhuisById;
module.exports.createStudentenhuis = createStudentenhuis;
