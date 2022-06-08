const express = require("express")
const router = express.Router()
const path = require ("path")
//requerimos multer para la creacion del usuario//
const multer = require ("multer")

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
 

const usersController = require("../controllers/usersController.js")


router.get("/inicia-sesion" , usersController.iniciaSesion)
//ruta de vista de registro//
router.get("/registro" , usersController.registro)
//ruta de creación de usuario//
router.post("/registro" , upload.single("imagenUsuario"), usersController.newRegister);

module.exports = router