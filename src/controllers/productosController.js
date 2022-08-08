const fs = require("fs")
const path = require("path")

const productosFilePath = path.join(__dirname , "../data/products.json")
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))
const db = require("../database/models")
const {validationResult} = require('express-validator');
const Op = db.Sequelize.Op;
const sequelize = require('sequelize')


const productosController = {

    productos: function(req,res){
       // let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
       //res.render('productos', {productos : productos})
        db.Daycare.findAll()
            .then(daycares => {
                res.render('productos.ejs', {daycares})
            })

    },

    detalleProducto: function(req, res){

        // let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
        // res.render('detalle-producto', {guarderia : guarderia})


        db.Daycare.findByPk(req.params.id,
            {})
            .then(daycare => {
                res.render('detalle-producto.ejs', {daycare});
            })
    },

    carrito: function(req, res){
        res.render('carrito')
    },

    vistaCrear: function(req,res){
        res.render('crear-producto')
    },

    crear: function(req,res){

    //    let nuevaGuarderia = {
    //         id: productos[productos.length -1].id +1 ,
    //         nombre: req.body.nombre,
    //         precio: parseInt(req.body.precio),
    //         categoria: req.body.categoria,
    //         caracteristicas: req.body.caracteristicas,
    //         instalaciones: req.body.instalaciones,
    //         imagen: req.file ? req.file.filename : "default-img.jpg"
    //     }
    //     productos.push(nuevaGuarderia)
    //     fs.writeFileSync(productosFilePath, JSON.stringify(productos,null, " "))

    const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
                console.log(resultValidation.errors)
                res.render("crear-producto")
            } else {

    db.Daycare.create({

        name: req.body.nombre,
        price: req.body.precio,
        category_id: req.body.categoria,
        characteristics: req.body.caracteristicas,
        facilities: req.body.instalaciones,
        image: req.file ? req.file.filename : "default-img.jpg"
    })
    .then (()=> {
        return res.redirect('productos')
     })
     .catch(error => res.send(error))

    }

    },

    vistaEditar: function(req,res){
        // let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
        // res.render('editar-producto', {guarderia : guarderia})

        let daycareId = req.params.id;
        let promDaycares = db.Daycare.findByPk(daycareId,{})
       .then((daycare) => {
        return res.render('editar-producto', {daycare})})
        .catch(error => res.send(error))

    },

    editar: function(req, res){
        // let guarderiaEditar = productos.find(guarderia => guarderia.id == req.params.id)
        // let guarderiaGuardar = {
        //     id: guarderiaEditar.id ,
        //     nombre: req.body.nombre,
        //     precio: req.body.precio,
        //     categoria: req.body.categoria,
        //     caracteristicas: req.body.caracteristicas,
        //     instalaciones: req.body.instalaciones,
        //     imagen: req.file ? req.file.filename : guarderiaEditar.imagen}
        // let indice = productos.findIndex(guarderia => {
        //     return guarderia.id == req.params.id
        // })
        // productos[indice] = guarderiaGuardar
        // fs.writeFileSync(productosFilePath, JSON.stringify(productos,null, " "))
        // res.redirect("/productos/productos")



        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
               res.redirect('/productos/productos')
            } else {

        let daycareId = req.params.id;
        db.Daycare.update(
            {
                name: req.body.nombre,
                price: req.body.precio,
                category_id: req.body.categoria,
                characteristics: req.body.caracteristicas,
                facilities: req.body.instalaciones,
                image: req.file ? req.file.filename : "default-img.jpg"
            },
            {
                where: {id: daycareId}
            })
        .then(()=> {
            return res.redirect("/productos/productos")})
        .catch(error => res.send(error))
        }
    },

    eliminar: function(req, res){
        // let idEliminar = req.params.id;
        // let resultado = productos.filter(guarderia => guarderia.id != idEliminar);
        // fs.writeFileSync(productosFilePath, JSON.stringify(resultado,null, " "))
        // res.redirect("/")

        let daycareId = req.params.id;
        db.Daycare.destroy({where: {id: daycareId}, force: true})
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error))

    },
    
    apiProducts: async(req, res)=>{
        const groupCategory = await db.Daycare.findAll(
            {
               attributes: ['category_id', [sequelize.fn('count', sequelize.col('id')), 'count']],
               group: ['category_id'],
            })
            db.Daycare
            .findAll()
            .then(daycares =>{
                return res.json({
                    count: daycares.length,
                    products: daycares.lenght,
                    countByCategory: groupCategory
            })
            })

    },

   /*  apiProducts: function(req, res){
        db.Daycare.findAll(
        {
            // attributes: {
            //     include: [
            //       [sequelize.fn('COUNT', sequelize.col('name')), 'n_category_id']
            //     ],
            //     group: ["categoty_id"],
            //     raw:true
            //   }
        })
        .then(daycares =>{
            return res.json({
                count: daycares.length,
                products: daycares

            })
        })
  */


    

    apiShowProducts: function(req, res){
        db.Daycare.findByPk(req.params.id)
        .then(daycare =>{
            return res.json({
                daycare: daycare,
                image: "http://localhost:8000/img/guarderias/"+ daycare.image})
        }) .catch(error => res.send(error))

    }



}

module.exports = productosController