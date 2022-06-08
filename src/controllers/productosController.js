const fs = require("fs")
const path = require("path")

const productosFilePath = path.join(__dirname , "../data/products.json")
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))

const productosController = {

    productos: function(req,res){
        let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
        res.render('productos', {productos : productos})
    },

    detalleProducto: function(req, res){

        let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
        res.render('detalle-producto', {guarderia : guarderia})
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
            precio: parseInt(req.body.precio),
            categoria: req.body.categoria,
            caracteristicas: req.body.caracteristicas,
            instalaciones: req.body.instalaciones,
            imagen: req.file ? req.file.filename : "default-img.jpg"
        }

        productos.push(nuevaGuarderia)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos,null, " "))


        res.redirect('productos') 
    },
// Editar productos//
    vistaEditar: function(req,res){
        let guarderia = productos.find(guarderia => guarderia.id == req.params.id)
        res.render('editar-producto', {guarderia : guarderia})
    },

    editar: function(req,res){
        let guarderiaEditar = productos.find(guarderia => guarderia.id == req.params.id)

        let guarderiaGuardar = {
            id: guarderiaEditar.id ,
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            caracteristicas: req.body.caracteristicas,
            instalaciones: req.body.instalaciones,
            imagen: req.file ? req.file.filename : guarderiaEditar.imagen

        }

        let indice = productos.findIndex(guarderia => {
            return guarderia.id == req.params.id
        })

        productos[indice] = guarderiaGuardar

        fs.writeFileSync(productosFilePath, JSON.stringify(productos,null, " "))


        res.redirect("/productos/productos")
    },
    //Eliminar productos//

    eliminar: function(req, res){
        let idEliminar = req.params.id;
        let resultado = productos.filter(guarderia => guarderia.id != idEliminar);

        fs.writeFileSync(productosFilePath, JSON.stringify(resultado,null, " "))

        res.redirect("/")
    }

}

module.exports = productosController