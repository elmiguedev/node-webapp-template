// 1. imports
// ----------------------------------
const express = require("express")

// 2. definicion de las acciones de un controlador
// ----------------------------------

/** @type {express.RequestHandler} */
const index = (request, response) => {
    
    response.render("home/index");
}

// 3. exportar las acciones del controllador
// ----------------------------------

module.exports = {
    index,
}