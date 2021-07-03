// 1. imports
// ----------------------------------
const express = require("express")
const controller = {};

// 2. definicion de las acciones de un controlador
// ----------------------------------

/** @type {express.RequestHandler} */
controller.index = (request, response) => {
    response.render("account/login", {layout: false});
}

/** @type {express.RequestHandler} */
controller.logout = (req, res) => {
    req.logout();
    res.redirect("/login");
}


// 3. exportar las acciones del controllador
// ----------------------------------

module.exports = controller;