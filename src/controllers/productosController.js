const productosController = {

    detalleProducto: function(req,res){
        res.render('detalle-producto')
    },

    carrito: function(req,res){
        res.render('carrito')
    },

}

module.exports = productosController