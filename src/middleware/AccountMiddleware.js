module.exports = (req, res, next) => {
    if (req.isAuthenticated()){
        if (req.user.cambiar_clave) {
            return res.redirect("/password");
        }
        return next();
    } else {
        res.redirect("/login");
    }
}