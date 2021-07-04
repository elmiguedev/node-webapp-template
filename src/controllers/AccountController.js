// 1. imports
// ----------------------------------
const express = require("express")
const UsuarioService = require("../services/UsuarioService")
const controller = {};

// 2. definicion de las acciones de un controlador
// ----------------------------------

/** @type {express.RequestHandler} */
controller.index = (request, response) => {
    response.render("account/login", { layout: false });
}

/** @type {express.RequestHandler} */
controller.logout = (req, res) => {
    req.logout();
    res.redirect("/login");
}

/** @type {express.RequestHandler} */
controller.passwordView = (req, res) => {
    if (!req.isAuthenticated())
        res.redirect("/");

    if (!req.user.cambiar_clave)
        res.redirect("/");
    
    res.render("account/password", {layout:false});
}

/** @type {express.RequestHandler} */
controller.password = async (req, res) => {
    console.log("EL USER ID",req.user.id)
    console.log("LAS CLAVES",req.body)
    if (!req.isAuthenticated())
        res.redirect("/");

    if (!req.user.cambiar_clave)
        res.redirect("/");
    

    if (req.body.clave === req.body.repetirClave) {
        await UsuarioService.actualizarClave(req.user.id, req.body.clave);
        res.redirect("/logout");
    } else {
        res.render("account/password", {layout:false});
    }

}


// 3. exportar las acciones del controllador
// ----------------------------------

module.exports = controller;