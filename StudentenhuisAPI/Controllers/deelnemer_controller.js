const database = require("../Database/databaseconnection");
const apiError = require("../ApiError");

//getAllDeelnemersOfMaaltijd
function getAllDeelnemersOfMaaltijd(req, res){
    let sql = `SELECT Voornaam, Achternaam, Email FROM user JOIN deelnemers ON user.ID = deelnemers.UserID WHERE deelnemers.StudentenhuisID = ${req.params.studentenhuisID} AND deelnemers.MaaltijdID = ${req.params.maaltijdID} `;
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else if (results.length < 1){
            console.log(results);
            res.status(404).json(new apiError("StudentenhuisID or MaaltijdID is not found", 404));
        } else {
            res.status(200).json(results);
        }
    });
}

//deleteDeelnemerFromMaaltijd
function deleteDeelnemerFromMaaltijd(req, res){
    let sql = `DELETE FROM deelnemers WHERE StudentenhuisID = ${req.params.studentenhuisID} AND MaaltijdID = ${req.params.maaltijdID} `;
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

//createDeelnemer
function createDeelnemer(req, res){
    const studentenhuisID = req.params.studentenhuisID;
    const maaltijdID = req.params.maaltijdID;

    let sql = "INSERT INTO deelnemers (`StudentenhuisID`, `MaaltijdID`) VALUES ('"+ studentenhuisID + "', '"+ maaltijdID +"')";
    console.log(sql);
    let query = database.connection.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.status(200).json("Deelnemer created!")
        }
    });
}

module.exports.getAllDeelnemersOfMaaltijd = getAllDeelnemersOfMaaltijd;
module.exports.deleteDeelnemerFromMaaltijd = deleteDeelnemerFromMaaltijd;
module.exports.createDeelnemer = createDeelnemer;