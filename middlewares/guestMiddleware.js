function guestMiddleware(req,res,next) {
      if (req.session.userLogged) {
            return res.redirect('/users/detalle-profile');
      }
      next();
}

module.exports = guestMiddleware