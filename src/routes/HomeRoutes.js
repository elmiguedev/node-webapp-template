// 1. importa express router y controlador
// -------------------------------------------

const router = require("express").Router();
const homeController = require("../controllers/HomeController");
const Auth = require("../middleware/AccountMiddleware");

// 2. crea las rutas 
// -------------------------------------------
router.get("/", Auth, homeController.index);

// 3. exporta las rutas 
// -------------------------------------------
module.exports = router;
