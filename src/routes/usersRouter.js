const express = require("express")
const router = express.Router()

const usersController = require("../controllers/usersController.js")


router.get("/inicia-sesion" , usersController.iniciaSesion)

router.get("/registro" , usersController.registro)

module.exports = router