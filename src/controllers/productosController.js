const productosController = {

    detalleProducto: function(req,res){
        res.render('detalle-producto')
    },

    carrito: function(req,res){
        res.render('carrito')
    },

    crear: function(req,res){
        res.render('crear-producto')
    },

    editar: function(req,res){
        res.render('editar-producto')
    },

}

module.exports = productosController