const express = require("express")
const router = express.Router()
const path = require("path")
const multer = require("multer")
const {body} = require("express-validator")

const productosController = require("../controllers/productosController.js")

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = path.join(__dirname , "../../public/img/guarderias" )
        cb(null, folder )
    },
    filename: function(req, file, cb){
        cb(null, "guarderia- " + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage})

const validateDataProducts = [
    body("nombre")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isLength({min:5}).withMessage("Debe ingresar un nombre válido"),
    body("precio")
        .notEmpty().withMessage("Debe ingresar un precio"),
    body("caracteristicas")
        .notEmpty().withMessage("Debe ingresar las caractisticas").bail()
        .isLength({min:20}).withMessage("Debe ingresar al menos 20 caracteres"),
    body("instalaciones")
        .notEmpty().withMessage("Debe ingresar las instalaciones"),
    body("imagen")
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG", ".gif", ".GIF"];
            if (!file) {
                // throw new Error("Debe subir una imagen")
                file = "default-img.jpg"
                } else {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error("Las extensiones permitidas son .jpg, .jpeg, .png, .gif")
                        }}

            return true;
        })
]


router.get("/productos" , productosController.productos)

router.get("/detalle-producto/:id/" , productosController.detalleProducto)

router.get("/carrito" , productosController.carrito)


router.get("/crear-producto" , productosController.vistaCrear)
router.post("/crear-producto" , upload.single("imagen"), validateDataProducts, productosController.crear)

router.get("/editar-producto/:id/" , productosController.vistaEditar)
router.put("/editar-producto/:id/" , upload.single("imagen"), validateDataProducts, productosController.editar)

router.delete("/eliminar-producto/:id/" , productosController.eliminar)



module.exports = router