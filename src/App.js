// 1. importa variables de entorno
// ------------------------------------
require("dotenv").config();

// 2. importa librerias
// ------------------------------------
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars")

const app = express();

// 3. configura el servidor web
// ------------------------------------


function configurarExpress() {
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.urlencoded({ extended: true }));
}

function configurarSeguridad() {
    const cookieParser = require("cookie-parser");
    const session = require("express-session");
    const passport = require("passport");
    const LocalStrategy = require("passport-local").Strategy;
    const secret = "mi clave super secreta";

    app.use(cookieParser(secret));
    app.use(session({
        secret: secret,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(async (usuario, clave, done) => {
        // aca va la logica de autenticacion
        console.log("valida", usuario, clave);
        const UsuarioService = require("./services/UsuarioService");
        const user = await UsuarioService.obtenerUno(usuario, clave);

        console.log("el usuario", user);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        done(null, { id: 1, usuario: "migue" });
    })

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));


}

function configurarViewEngine() {
    const helpers = require("handlebars-helpers")

    app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: helpers }));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', '.hbs');
}

function configurarRutas() {
    app.use(require("./routes/HomeRoutes"));
    app.use(require("./routes/AccountRoutes"));
    app.use(require("./routes/UsuariosRoutes"));
}

function inicializar() {

    // configuraciones
    configurarExpress();
    configurarSeguridad();
    configurarViewEngine();
    configurarRutas();

    // arranca el servidor
    app.listen(process.env.PORT, async () => {
        console.log(`escuchando en el puerto ${process.env.PORT}`);

    })
}

// 1. importa variables de entorno
// ------------------------------------

inicializar();

