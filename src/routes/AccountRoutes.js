// 1. importa express router y controlador
// -------------------------------------------

const router = require("express").Router();
const accountController = require("../controllers/AccountController");
const Auth = require("../middleware/AccountMiddleware");

// 2. crea las rutas 
// -------------------------------------------
router.get("/login", accountController.index);
router.get("/logout", accountController.logout);
router.get("/password", accountController.passwordView);
router.post("/password", accountController.password);

// 3. exporta las rutas 
// -------------------------------------------
module.exports = router;
