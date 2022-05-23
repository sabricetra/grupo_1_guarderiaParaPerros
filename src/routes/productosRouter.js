const express = require("express")
const router = express.Router()
const path = require("path")
const multer = require("multer")

const productosController = require("../controllers/productosController.js")

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = path.join(__dirname , "../../public/img/guarderias" )
        cb(null, folder )
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_guarderia"+ path.extname(file.originalname))
    }
})

const upload = multer({storage : storage})


router.get("/productos" , productosController.productos)

router.get("/detalle-producto/:id/" , productosController.detalleProducto)

router.get("/carrito" , productosController.carrito)


router.get("/crear-producto" , productosController.vistaCrear)
router.post("/crear-producto" , upload.single("imagen"), productosController.crear)

router.get("/editar-producto/:id/" , productosController.vistaEditar)
router.put("/editar-producto/:id/" , upload.single("imagen"), productosController.editar)

router.delete("/eliminar-producto/:id/" , productosController.eliminar)

module.exports = router