const express = require("express");
const bodyParser = require("body-parser");
const database = require("./Database/databaseconnection");
const app = express();
const studentenhuis_routes = require("./Routes/studentenhuis_routes");

app.use(bodyParser.json());

database.connectToDB();

//studentenhuis routes
app.use("/api/studentenhuis", studentenhuis_routes);


app.listen(3000, () =>{
    console.log("Listening to port 3000!");
});

