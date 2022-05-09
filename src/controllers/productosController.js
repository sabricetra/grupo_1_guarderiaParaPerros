const fs = require("fs")
const path = require("path")

const productosFilePath = path.join(__dirname , "../data/products.json")
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))

const productosController = {

    detalleProducto: function(req,res){
        res.render('detalle-producto')
    },

    producto: function(req, res){
        res.render('producto')
    },

    carrito: function(req,res){
        res.render('carrito')
    },

    vistaCrear: function(req,res){
        res.render('crear-producto')
    },

    crear: function(req,res){

        let nuevaGuarderia = {

            id: productos[productos.length -1].id +1 ,
            nombre: req.body.nombre,
            caracteristicas: req.body.caracteristicas,
            instalaciones: req.body.instalaciones,
            imagen: "default-img.jpg"

        }

        productos.push(nuevaGuarderia)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos,null, " "))


        res.redirect('detalle-producto')
    },

    vistaEditar: function(req,res){
        res.render('editar-producto')
    },

    editar: function(req,res){

        res.send(req.body)

        res.redirect('detalle-producto')
    },

}

module.exports = productosController