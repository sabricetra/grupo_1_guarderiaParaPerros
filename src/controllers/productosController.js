const fs = require("fs")
const path = require("path")

const productosFilePath = path.join(__dirname , "../data/products.json")
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))
const db = require("../database/models")


const productosController = {

    productos: function(req,res){
       // let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
       //res.render('productos', {productos : productos})
        db.Daycare.findAll({

        })
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

    }



}

module.exports = productosController