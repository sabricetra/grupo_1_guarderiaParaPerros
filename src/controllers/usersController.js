//Requiero módulos para que guarde los datos en el json//
const fs = require("fs")
const path = require("path")
const registroFilePath = path.join(__dirname , "../data/users.json")
const {validationResult} = require('express-validator');

// const registro = JSON.parse(fs.readFileSync(registroFilePath, "utf-8"))


// requeriendo encriptado de contraseña
const bcrypt = require('bcryptjs')
const { redirect } = require("express/lib/response")

const db = require("../database/models")




const usersController = {

    iniciaSesion: function(req,res){
        res.render('inicia-sesion')
    },

    processLogin: function(req,res){
         db.User.findOne({

            where: {
                email : req.body.email

        }})
        .then((usuario)=> {

            if(usuario) {
                let passwordOk = bcrypt.compareSync(req.body.password, usuario.password);
                if(passwordOk) {
                    req.session.userLogged = usuario
                    if(req.body.recordame !=undefined){
                       res.cookie("recordame",userToLogin.email,{maxAge:60000})
                    }
                    return res.redirect("/users/detalle-profile");
                }

            }

            return res.render('inicia-sesion', {
                errors: {
                email: {
                msg: 'Credenciales invalidas'
                        }
                    }
                })

        })

    },

    registro: function(req,res){
    res.render('registro')
    },

    //Función para guardar el usuario, tener en cuenta que los campos deben ser los mismos
    //que el campo del formulario y del json!//

    newRegister: function (req, res){

        // let nuevoUsuario = {

            // id: registro[registro.length -1].id +1 ,
            // first_name: req.body.first_name,
            // last_name: req.body.last_name,
            // date:req.body.date,
            // adress: req.body.adress,
            // email: req.body.email,
            // password: bcrypt.hashSync(req.body.password, 10),
            // dni:req.body.dni,
            // category: req.body.category,
            // image: req.file ? req.file.filename : "default-profileimg.jpg"
        // }

        // //guardar en el json//
        // registro.push(nuevoUsuario)
        // fs.writeFileSync(registroFilePath, JSON.stringify(registro,null, " "))

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
                // console.log(resultValidation.errors)
                res.render("registro")
            } else {

                db.User.create({

            firstName: req.body.first_name,
            lastName: req.body.last_name,
            date:req.body.date,
            adress: req.body.adress,
            dni:req.body.dni,
            image: req.file ? req.file.filename : "default-profileimg.jpg",
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        .then (()=> {
            return res.redirect("inicia-sesion")
         })
         .catch(error => res.send(error))
        }
    },

    detalleProfile: function(req, res) {

        res.render('detalle-profile', {
            user: req.session.userLogged
        })

    },

    logout: function(req,res) {
        req.session.destroy()
        return res.redirect("/")

    },

    vistaEditarPerfil: function(req, res){

        let userId = req.params.id;
        db.User.findByPk(userId,{})
       .then((user) => {
        return res.render('editar-perfil', {user})})
        .catch(error => res.send(error))

    },


    editarPerfil: function(req, res){

        let userId = req.params.id;

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
                // console.log(resultValidation.errors)
                res.redirect("/")
            } else {

        db.User.update(
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                date:req.body.date,
                adress: req.body.adress,
                dni:req.body.dni,
                image: req.file ? req.file.filename : "default-profileimg.jpg",
                email: req.body.email,
            },
            {
                where: {id: userId}
            })
        .then(()=> {

            db.User.findByPk(userId)
            .then( (usuarioEditado) => {
                req.session.userLogged = usuarioEditado
            return res.redirect("/users/detalle-profile")

            })
        })
        .catch(error => res.send(error))
    }
    },
    apiUsers: function(req, res){
        db.User.findAll(
            {
                attributes: ["id","firstName","lastName","email"]
            }
        )
        .then(users =>{
            return res.json({
                count: users.length,
                users: users
            })
        })
    },
    apiShowUser: function(req, res){
        db.User.findByPk(req.params.id, {
            attributes: { exclude: [ "password"]}
        })
        .then(user =>{
            return res.json({
                user: user,
                image: "http://localhost:8000/img/users/"+ user.image})
        })
    }


}

module.exports = usersController




