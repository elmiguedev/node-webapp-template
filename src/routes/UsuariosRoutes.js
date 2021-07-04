// 1. importa express router y controlador
// -------------------------------------------

const router = require("express").Router();
const usuariosController = require("../controllers/UsuariosController");
const Auth = require("../middleware/AccountMiddleware");

// 2. crea las rutas 
// -------------------------------------------
router.get("/usuarios", Auth, usuariosController.index);
router.get("/usuarios/nuevo", Auth, usuariosController.nuevoView);
router.post("/usuarios/nuevo", Auth, usuariosController.nuevo);
router.post("/usuarios/eliminar", Auth, usuariosController.eliminar);

// 3. exporta las rutas 
// -------------------------------------------
module.exports = router;
