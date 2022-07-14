const express = require("express")
const router = express.Router()
const path = require ("path")
//requerimos multer para la creacion del usuario//
const multer = require ("multer")
const {body} = require("express-validator")


const usersController = require("../controllers/usersController.js")

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

const validateDataUsers = [
    body("first_name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isLength({min:2}).withMessage("Debe ingresar un nombre válido"),
    body("last_name")
        .notEmpty().withMessage("Debe ingresar un apellido").bail()
        .isLength({min:2}).withMessage("Debe ingresar un apellido válido"),
    body("date")
        .notEmpty().withMessage("Debe ingresar una fecha de nacimiento"),
    body("adress")
        .notEmpty().withMessage("Debe ingresar una dirección"),
    body("email")
        .notEmpty().withMessage("Debe ingresar un correo electrónico").bail()
        .isEmail().withMessage("Debe ingresar un correo electrónico válido"),
    body("dni")
        .notEmpty().withMessage("Debe ingresar un dni").bail()
        .isLength({min:8, max: 10}).withMessage("Debe ingresar un dni válido"),
    body("password")
        .notEmpty().withMessage("Debe ingresar una contraseña").bail()
        .isLength({min:8}).withMessage("La contraseña debe tener como minimo 8 caracteres"),
    body("imagenUsuario")
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG", ".gif", ".GIF"];
            if (!file) {
                // throw new Error("Debe subir una imagen")
                file = "default-profileimg.jpg"
                } else {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error("Las extensiones permitidas son .jpg, .jpeg, .png, .gif")
                        }}

            return true;
        })
]

const validateDataUsersEdit = [
    body("first_name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isLength({min:2}).withMessage("Debe ingresar un nombre válido"),
    body("last_name")
        .notEmpty().withMessage("Debe ingresar un apellido").bail()
        .isLength({min:2}).withMessage("Debe ingresar un apellido válido"),
    body("date")
        .notEmpty().withMessage("Debe ingresar una fecha de nacimiento"),
    body("adress")
        .notEmpty().withMessage("Debe ingresar una dirección"),
    body("email")
        .notEmpty().withMessage("Debe ingresar un correo electrónico").bail()
        .isEmail().withMessage("Debe ingresar un correo electrónico válido"),
    body("dni")
        .notEmpty().withMessage("Debe ingresar un dni").bail()
        .isLength({min:8, max: 10}).withMessage("Debe ingresar un dni válido"),
    body("imagenUsuario")
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG", ".gif", ".GIF"];
            if (!file) {
                // throw new Error("Debe subir una imagen")
                file = "default-profileimg.jpg"
                } else {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error("Las extensiones permitidas son .jpg, .jpeg, .png, .gif")
                        }}

            return true;
        })
]

router.get("/inicia-sesion" , guestMiddleware, usersController.iniciaSesion);
router.post("/inicia-sesion" , usersController.processLogin);
//ruta de vista de registro//
router.get("/registro" , guestMiddleware, usersController.registro);
//ruta de creación de usuario//
router.post("/registro" , upload.single("imagenUsuario"), validateDataUsers, usersController.newRegister);
router.get("/detalle-profile", authMiddleware,  usersController.detalleProfile);

router.get("/editar-perfil/:id/" , usersController.vistaEditarPerfil)

router.put("/editar-perfil/:id/" ,  upload.single("imagenUsuario"), validateDataUsersEdit, usersController.editarPerfil)


router.get("/logout" , usersController.logout)

module.exports = router