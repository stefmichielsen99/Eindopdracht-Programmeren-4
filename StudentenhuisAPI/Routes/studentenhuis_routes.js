const express = require("express");
let routes = express.Router();
const studentenhuisController = require("../Controllers/studentenhuis_controller");

routes.post("/", studentenhuisController.createStudentenhuis);
routes.get("/", studentenhuisController.getAllStudentenhuizen);
routes.get("/:ID", studentenhuisController.getStudentenhuisById);
routes.put("/:ID", studentenhuisController.updateStudentenhuisById);
routes.delete("/:ID", studentenhuisController.deleteStudentenhuisById);


module.exports = routes;