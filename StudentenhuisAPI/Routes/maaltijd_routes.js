
const express = require("express");
let routes = express.Router();
const maaltijdController = require("../Controllers/maaltijd_controller");

routes.post("/:studentenhuisID/maaltijd/", maaltijdController.createMaaltijdById);
routes.get("/:studentenhuisID/maaltijd/", maaltijdController.getAllMaaltijden);
routes.get("/:studentenhuisID/maaltijd/:maaltijdID", maaltijdController.getMaaltijdById);
routes.put("/:studentenhuisID/maaltijd/:maaltijdID", maaltijdController.updateMaaltijdById);
routes.delete("/:studentenhuisID/maaltijd/:maaltijdID", maaltijdController.deleteMaaltijdById);

module.exports = routes;
