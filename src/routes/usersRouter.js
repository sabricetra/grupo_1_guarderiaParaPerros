const express = require("express")
const router = express.Router()
const path = require ("path")
//requerimos multer para la creacion del usuario//
const multer = require ("multer")
const {body} = require("express-validator")

const guestMiddleware = require('../../middlewares/guestMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware')


//dónde se va a guardar//
const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/users"))
    },
    filename: (req, file, cb)=>{
        const newFilename = "user- "+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename );
    }}
);

//Ejecución de multer//
const upload = multer ({storage: storage});

const validateData = [
    body("first_name")
        .notEmpty().withMessage("Debe ingresar un nombre"),
    body("last_name")
        .notEmpty().withMessage("Debe ingresar un apellido"),
    body("date")
        .notEmpty().withMessage("Debe ingresar una fecha de nacimiento"),
    body("adress")
        .notEmpty().withMessage("Debe ingresar una dirección"),
    body("email")
        .notEmpty().withMessage("Debe ingresar un correo electrónico"),
    body("dni")
        .notEmpty().withMessage("Debe ingresar un dni")
]

const usersController = require("../controllers/usersController.js")


router.get("/inicia-sesion" , guestMiddleware, usersController.iniciaSesion);
router.post("/inicia-sesion" , usersController.processLogin);
//ruta de vista de registro//
router.get("/registro" , guestMiddleware, usersController.registro);
//ruta de creación de usuario//
router.post("/registro" , upload.single("imagenUsuario"), usersController.newRegister);
router.get("/detalle-profile", authMiddleware, usersController.detalleProfile);

router.get("/logout" , usersController.logout)

module.exports = router