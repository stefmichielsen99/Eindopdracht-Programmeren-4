const database = require("../Database/databaseconnection");
const apiError = require("../ApiError");
const maaltijd = require("../Models/Maaltijd");
const auth = require("../util/auth/authentication");

//getAllMaaltijden
function getAllMaaltijden(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
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
    });
}

//getMaaltijdById
function getMaaltijdById(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
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
    });
}

//deleteMaaltijdById
function deleteMaaltijdById(req, res){

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
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
    });
}

//createMaaltijdById
function createMaaltijdById(req, res){ 

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            const Naam = req.body.Naam;
            const Beschrijving = req.body.Beschrijving;
            const Ingredienten = req.body.Ingredienten;
            const Allergie = req.body.Allergie;
            const Prijs = req.body.Prijs;
            const studentenhuisID = req.params.studentenhuisID;
            let UserID = JSON.stringify(payload.sub);
            let userId = UserID.replace(/\D/g,'');
            const test = auth.decodePayload(token);

            console.log(req.body);

            try {
                let meal = new maaltijd(Naam, Beschrijving, Ingredienten, Allergie, Prijs);
            } catch (error){
                console.log(error);
                res.status(412).json(new apiError("Wrong or missing element in body!", 412));
                return;
            }


            let sql = "INSERT INTO maaltijd (`Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs`, `UserID`, `StudentenhuisID`) VALUES ('"+ Naam +"', '"+ Beschrijving +"', '"+ Ingredienten +"', '"+ Allergie +"', '"+ Prijs +"', '"+ userId +"', '"+ studentenhuisID +"')";
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {
                if(error){
                    console.log(error);
                } else if(results.affectedRows === 0){
                    res.status(404).json(new apiError("StudentenhuisID is not found", 404));
                } else {
                    res.status(200).json("Post was made...!");
                }
            });
        }
    });
}

function updateMaaltijdById(req, res) {

    const token = req.header("x-access-token");

    auth.decodeToken(token, (error, payload) => {
        if(error){
            console.log(error);
            res.json(new apiError("No token or wrong token provided", 401));
        } else {
            const Naam = req.body.Naam; 
            const Beschrijving = req.body.Beschrijving;
            const Ingredienten = req.body.Ingredienten;
            const Allergie = req.body.Allergie;
            const Prijs = req.body.Prijs;
            const studentenhuisID = req.params.studentenhuisID;
            const maaltijdID = req.params.maaltijdID;

            console.log(req.body);
            console.log(typeof(Prijs));

            try {
                let meal = new maaltijd(Naam, Beschrijving, Ingredienten, Allergie, Prijs);
            } catch (error){
                console.log(error);
                res.status(412).json(new apiError("Wrong or missing element in body!", 412));
                return;
            }

            let sql = `UPDATE maaltijd SET Naam = '` + Naam + `', Beschrijving = '` + Beschrijving + `', Ingredienten = '` + Ingredienten + `', Allergie = '`+ Allergie + `', Prijs = '` + Prijs + `' WHERE StudentenhuisID = ` + studentenhuisID + ` AND ID = ` + maaltijdID + ``; 
            console.log(sql);
            let query = database.connection.query(sql, (error, results) => {
                if(error){
                    console.log(error);
                } else if (results.affectedRows === 0){
                    res.status(404).json(new apiError("StudentenhuisID or MaaltijdID is not found", 404));
                } else {
                    res.status(200).json("Updated!");
                }
            });
        }
    });
}


module.exports.getAllMaaltijden = getAllMaaltijden;
module.exports.getMaaltijdById = getMaaltijdById;
module.exports.deleteMaaltijdById = deleteMaaltijdById;
module.exports.createMaaltijdById = createMaaltijdById;
module.exports.updateMaaltijdById = updateMaaltijdById;