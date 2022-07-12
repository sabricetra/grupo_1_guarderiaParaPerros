function authMiddleware(req,res,next) {
      if (!req.session.userLogged) {
            return res.redirect('/users/inicia-sesion');
      }
      next();
}

module.exports = authMiddleware