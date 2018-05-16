const database = require("../Database/databaseconnection");
const apiError = require("../ApiError");
const auth = require("../util/auth/authentication");

//getAllDeelnemersOfMaaltijd
function getAllDeelnemersOfMaaltijd(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
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
    });
}

//deleteDeelnemerFromMaaltijd
function deleteDeelnemerFromMaaltijd(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {

            let first = JSON.stringify(payload.sub);
            let payloadId = first.replace(/\D/g,'');
            console.log(payloadId);

            let sql1 = `SELECT UserID FROM deelnemers WHERE StudentenhuisID = ${req.params.studentenhuisID} AND MaaltijdID = ${req.params.maaltijdID}`;
            console.log(sql1);

            let query = database.connection.query(sql1, (error, result) => {

                console.log(result);

                let compare = JSON.stringify(result);
                let compare2 = compare.replace(/\D/g,'');
                console.log("test");
                console.log(compare2);

                if(error){
                    console.log(error);
                } else if (compare2.includes(payloadId)){
                    let sql = `DELETE FROM deelnemers WHERE StudentenhuisID = ${req.params.studentenhuisID} AND MaaltijdID = ${req.params.maaltijdID} AND UserID =  ` + payloadId;
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
                } else {
                    res.json(new apiError("Conflict, you can't delete this", 409));
                }
            });
        }
    });
}

//createDeelnemer
function createDeelnemer(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {

            let first = JSON.stringify(payload.sub);
            let payloadId = first.replace(/\D/g,'');
            console.log(payloadId);

            let sql1 = `SELECT UserID FROM deelnemers WHERE StudentenhuisID = ${req.params.studentenhuisID} AND MaaltijdID = ${req.params.maaltijdID}`;
            console.log(sql1);

            let query = database.connection.query(sql1, (error, result) => {

                console.log(result);

                let compare = JSON.stringify(result);
                let compare2 = compare.replace(/\D/g,'');

                console.log(compare2);


                if(error){
                    console.log(error);
                    res.json(new apiError("Conflict, you can't be added to this meal", 409));
                } else if (!compare2.includes(payload)){

                    console.log(compare2.includes(payload));
                    const studentenhuisID = req.params.studentenhuisID;
                    const maaltijdID = req.params.maaltijdID;
                    const UserId = payload.sub.ID;

                    let UserID = JSON.stringify(payload.sub);
                    let userId = UserID.replace(/\D/g,'');
                    const test = auth.decodePayload(token);

                    let sql = "INSERT INTO deelnemers (`StudentenhuisID`, `MaaltijdID`, `UserID`) VALUES ('"+ studentenhuisID + "', '"+ maaltijdID +"', '"+ userId +"')";
                    console.log(sql);
                    let query = database.connection.query(sql, (error, results) => {
                        if(error){
                            res.json(new apiError("Conflict, you can't be added to this meal", 409));
                        } else if(results.affectedRows === 0){
                            res.status(404).json(new apiError("StudentenhuisID or MaaltijdID is not found", 404));
                        } else {
                            res.status(200).json("You've been added to the meal!")
                        }
                    });
                } else {
                    res.json(new apiError("Conflict, you can't be added to this meal", 409));
                }
            });
        }
    });
}

module.exports.getAllDeelnemersOfMaaltijd = getAllDeelnemersOfMaaltijd;
module.exports.deleteDeelnemerFromMaaltijd = deleteDeelnemerFromMaaltijd;
module.exports.createDeelnemer = createDeelnemer;