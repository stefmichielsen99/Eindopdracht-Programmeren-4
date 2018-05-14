const database = require("../Database/databaseconnection");

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
        } else {
            res.status(200).json("Succesfully deleted!");
        }
    });
}

//UpdateStudentenhuisById
function updateStudentenhuisById(req, res){
    const ID = req.body.ID;
    const Naam = req.body.Naam;
    const Adres = req.body.Adres;
    const UserID = req.body.UserID;

    console.log(req.body);

    let sql = `UPDATE studentenhuis SET 'ID' = ` + ID + `'Naam' = ` + Naam + `'Adres' = ` + Adres + `'UserId' = ` + UserId + `WHERE ID = ${req.params.ID}`; 
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
    const ID = req.body.ID;
    const Naam = req.body.Naam;
    const Adres = req.body.Adres;
    const UserID = req.body.UserID;

    console.log(req.body);

    let sql = "INSERT INTO studentenhuis (`ID`, `Naam`, `Adres`, `UserID`) VALUES ('"+ ID +"','"+ Naam +"', '"+ Adres +"', '"+ UserID +"')";
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.status(200).json(results);
        }
    });
}


module.exports.getAllStudentenhuizen = getAllStudentenhuizen;
module.exports.getStudentenhuisById = getStudentenhuisById;
module.exports.updateStudentenhuisById = updateStudentenhuisById;
module.exports.deleteStudentenhuisById = deleteStudentenhuisById;
module.exports.createStudentenhuis = createStudentenhuis;
