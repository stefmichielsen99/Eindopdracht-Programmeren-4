const express = require("express");
let routes = express.Router();
const deelnemer_controller = require("../Controllers/deelnemer_controller");

routes.get("/:studentenhuisID/maaltijd/:maaltijdID/deelnemers", deelnemer_controller.getAllDeelnemersOfMaaltijd);
routes.post("/:studentenhuisID/maaltijd/:maaltijdID/deelnemers", deelnemer_controller.createDeelnemer);
routes.delete("/:studentenhuisID/maaltijd/:maaltijdID/deelnemers", deelnemer_controller.deleteDeelnemerFromMaaltijd);

module.exports = routes;