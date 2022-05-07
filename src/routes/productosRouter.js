const express = require("express")
const router = express.Router()

const productosController = require("../controllers/productosController.js")


router.get("/detalle-producto" , productosController.detalleProducto)

router.get("/carrito" , productosController.carrito)


router.get("/crear-producto" , productosController.crear)

router.get("/editar-producto" , productosController.editar)

module.exports = router