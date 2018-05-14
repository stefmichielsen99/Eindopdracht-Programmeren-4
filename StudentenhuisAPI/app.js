const express = require("express");
const bodyParser = require("body-parser");
const database = require("./Database/databaseconnection");
const app = express();

app.use(bodyParser.json());

database.connectToDB();




app.listen(3000, () =>{
    console.log("Listening to port 3000!");
});