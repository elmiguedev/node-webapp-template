// 1. imports
// ----------------------------------
const express = require("express")
const UsuarioService = require("../services/UsuarioService");
const controller = {};

// 2. definicion de las acciones de un controlador
// ----------------------------------

/** @type {express.RequestHandler} */
controller.index = async (request, response) => {
    
    // 1. obtiene todos los usuarios
    const usuarios = await UsuarioService.obtenerTodo();

    // 2. renderiza la pagina
    response.render("usuarios/index", {
        usuarios: usuarios
    });
}

// 3. exportar las acciones del controllador
// ----------------------------------

module.exports = controller;