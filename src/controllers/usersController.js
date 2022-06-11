//Requiero módulos para que guarde los datos en el json//
const fs = require("fs")
const path = require("path")
const registroFilePath = path.join(__dirname , "../data/users.json")
const registro = JSON.parse(fs.readFileSync(registroFilePath, "utf-8"))

// requeriendo encriptado de contraseña
const bcryptjs = require('bcryptjs')




const usersController = {

    iniciaSesion: function(req,res){
        res.render('inicia-sesion')
    },

    registro: function(req,res){
    res.render('registro')
    },

    //Función para guardar el usuario, tener en cuenta que los campos deben ser los mismos
    //que el campo del formulario y del json!//
    newRegister: function (req, res){

        let nuevoUsuario = {

            id: registro[registro.length -1].id +1 ,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date:req.body.date,
            adress: req.body.adress,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            dni:req.body.dni,
            category: req.body.category,
            image: req.file ? req.file.filename : "default-img.jpg"
        }

        //guardar en el json//
        registro.push(nuevoUsuario)
        fs.writeFileSync(registroFilePath, JSON.stringify(registro,null, " "))

//redirigir a la vista del home//
        res.redirect("inicia-sesion")





    }


    

}

module.exports = usersController




