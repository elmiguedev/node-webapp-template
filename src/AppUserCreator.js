const UserManager = require("./services/UsuarioService");

UserManager.insertar({
    nombre: "Administrador",
    perfil: 1,
}).then(
    res => {
        console.log("listo");
    }
);
