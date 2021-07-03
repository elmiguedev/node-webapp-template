// 1. importa express router y controlador
// -------------------------------------------

const router = require("express").Router();
const accountController = require("../controllers/AccountController");
const Auth = require("../middleware/AccountMiddleware");

// 2. crea las rutas 
// -------------------------------------------
router.get("/login", accountController.index);
router.get("/logout", Auth, accountController.logout);

// 3. exporta las rutas 
// -------------------------------------------
module.exports = router;
