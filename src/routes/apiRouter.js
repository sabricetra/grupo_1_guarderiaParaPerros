const express = require("express")
const router = express.Router()
const path = require ("path")

const usersController = require("../controllers/usersController.js")
const productosController = require("../controllers/productosController.js")

router.get("/users" , usersController.apiUsers)

router.get("/users/:id" , usersController.apiShowUser)


router.get("/products" , productosController.apiProducts)

router.get("/products/:id" , productosController.apiShowProducts)




module.exports = router