const express = require("express")
const router = express.Router()
const multer = require("multer")

const productosController = require("../controllers/productosController.js")

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/img/uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage})


router.get("/detalle-producto" , productosController.detalleProducto)

router.get("/carrito" , productosController.carrito)


router.get("/crear-producto" , productosController.vistaCrear)
router.post("/" , upload.single("imagen"), productosController.crear)

router.get("/editar-producto" , productosController.vistaEditar)
router.put("/editar-producto" , upload.single("imagen"), productosController.editar)

module.exports = router