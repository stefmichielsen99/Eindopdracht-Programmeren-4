const database = require("../Database/databaseconnection");
const apiError = require("../ApiError");

//getAllMaaltijden
function getAllMaaltijden(req, res){
    let sql = `SELECT * FROM maaltijd WHERE StudentenhuisID = ${req.params.studentenhuisID}`;
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else if(results.length < 1){
            console.log(results);
            res.status(404).json(new apiError("StudentenhuisID is not found", 404));
        } else {
            res.status(200).json(results);
        }
    });
}

//getMaaltijdById
function getMaaltijdById(req, res){
    let sql = `SELECT * FROM maaltijd WHERE StudentenhuisID = ${req.params.studentenhuisID} AND ID = ${req.params.maaltijdID}`;
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else if(results.length < 1){
            console.log(results);
            res.status(404).json(new apiError("StudentenhuisID or MaaltijdID is not found", 404));
        } else {
            res.status(200).json(results);
        }
    });
}

//deleteMaaltijdById
function deleteMaaltijdById(req, res){
    let sql = `DELETE FROM maaltijd WHERE StudentenhuisID = ${req.params.studentenhuisID} AND ID = ${req.params.maaltijdID}`;
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else if(results.affectedRows === 0){
            res.status(404).json(new apiError("StudentenhuisID or MaaltijdID is not found", 404));
        } else {
            res.status(200).json("Succesfully deleted!")
        }
    });
}

//createMaaltijdById
function createMaaltijdById(req, res){ //UserID moet nog worden gehaald uit JWT Token
    const Naam = req.body.Naam;
    const Beschrijving = req.body.Beschrijving;
    const Ingredienten = req.body.Ingredienten;
    const Allergie = req.body.Allergie;
    const Prijs = req.body.Prijs;
    const studentenhuisID = req.params.studentenhuisID;

    console.log(req.body);


    let sql = "INSERT INTO maaltijd (`Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs`, `StudentenhuisID`) VALUES ('"+ Naam +"', '"+ Beschrijving +"', '"+ Ingredienten +"', '"+ Allergie +"', '"+ Prijs +"', '"+ studentenhuisID +"')";
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else if(studentenhuisID < 1){
            res.status(404).json(new apiError("StudentenhuisID is not found", 404));
        } else {
            res.status(200).json("Post was made...!");
        }
    });
}

function updateMaaltijdById(req, res) {
    const Naam = req.body.Naam;
    const Beschrijving = req.body.Beschrijving;
    const Ingredienten = req.body.Ingredienten;
    const Allergie = req.body.Allergie;
    const Prijs = req.body.Prijs;
    const studentenhuisID = req.params.studentenhuisID;
    const maaltijdID = req.params.maaltijdID;

    console.log(req.body);

    let sql = `UPDATE maaltijd SET Naam = '` + Naam + `', Beschrijving = '` + Beschrijving + `', Ingredienten = '` + Ingredienten + `', Allergie = '`+ Allergie + `', Prijs = '` + Prijs + `' WHERE StudentenhuisID = ` + studentenhuisID + ` AND ID = ` + maaltijdID + ``; 
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else if (studentenhuisID < 1 || maaltijdID < 1){
            res.status(404).json(new apiError("StudentenhuisID or MaaltijdID is not found", 404));
        } else if(results.affectedRows === 0){
            res.status(412).json(new apiError("One of the properties in the body is incorrect or missing", 412));
        } else {
            res.status(200).json(results);
        }
    });
}


module.exports.getAllMaaltijden = getAllMaaltijden;
module.exports.getMaaltijdById = getMaaltijdById;
module.exports.deleteMaaltijdById = deleteMaaltijdById;
module.exports.createMaaltijdById = createMaaltijdById;
module.exports.updateMaaltijdById = updateMaaltijdById;