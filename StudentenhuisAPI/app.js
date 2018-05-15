const express = require("express");
const bodyParser = require("body-parser");
const database = require("./Database/databaseconnection");
const app = express();
const studentenhuis_routes = require("./Routes/studentenhuis_routes");
const maaltijd_routes = require("./Routes/maaltijd_routes");
const deelnemer_routes = require("./Routes/deelnemer_routes");
const authentication_routes  = require("./routes/authentication_routes")

app.use(bodyParser.json());

database.connectToDB();

//studentenhuis routes
app.use("/api", authentication_routes);
app.use("/api/studentenhuis", studentenhuis_routes);
app.use("/api/studentenhuis", maaltijd_routes);
app.use("/api/studentenhuis", deelnemer_routes);



app.listen(3000, () =>{
    console.log("Listening to port 3000!");
});

