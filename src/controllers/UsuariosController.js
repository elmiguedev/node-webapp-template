// 1. imports
// ----------------------------------
const express = require("express")
const UsuarioService = require("../services/UsuarioService");
const PerfilService = require("../services/PerfilService");
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

/** @type {express.RequestHandler} */
controller.nuevoView = async (request, response) => {
    // obtiene los perfiles
    const perfiles = await PerfilService.obtenerTodo();
    
    // renderiza la pagina
    response.render("usuarios/nuevo",{
        perfiles: perfiles
    });
};

/** @type {express.RequestHandler} */
controller.nuevo = async (request, response) => {
    // obtiene los datos del nuevo usuario
    const usuario = request.body;
    console.log("el body");

    // inserta los datos
    UsuarioService.insertar(usuario);

    // renderiza la pagina
    response.redirect("/usuarios");
};

/** @type {express.RequestHandler} */
controller.eliminar = async (request, response) => {
    
    // obtiene los datos del nuevo usuario
    const usuario = request.body

    // inserta los datos
    await UsuarioService.desactivar(usuario.id);

    // renderiza la pagina
    response.redirect("/usuarios");
};



// 3. exportar las acciones del controllador
// ----------------------------------

module.exports = controller;