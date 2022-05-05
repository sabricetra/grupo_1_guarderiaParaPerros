const usersController = {

    iniciaSesion: function(req,res){
        res.render('inicia-sesion')
    },

    registro: function(req,res){
        res.render('registro')
    }

}

module.exports = usersController




