const service = {};
const knex = require("knex");

/** @type {knex.default} */
const pg = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'root',
        database: 'Prueba'
    }
});

async function hashPassword(clave) {
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(clave, salt);
    return hash;
}

async function comparePassword(clave, hash) {
    const bcrypt = require("bcrypt");
    const validate = await bcrypt.compare(clave, hash);
    return validate;
}

service.obtenerPorUsuarioClave = async (usuario,clave) => {
    const user = await pg("usuario")
        .where("nombre",usuario)
        .andWhere("activo",true)
        .first();

    const validate = await comparePassword(clave, user.clave);
    if (validate) {
        return user;

    } else {
        return undefined;
    }

}

service.obtenerUno = async (id) => {
    const query = await pg("usuario")
        .where("id",id)
        .andWhere("activo",true)
        .first();
    return query;
}


service.obtenerTodo = async () => {
    const query = await pg("usuario")
        .innerJoin("perfil","perfil.id","usuario.perfil_id")
        .where("usuario.activo",true)
        .select("usuario.id as id","usuario.nombre as nombre","perfil.nombre as perfil");

        console.log(query);
    return query;
}

service.insertar = async (usuario) => {
    const hash = await hashPassword(usuario.nombre);
    await pg("usuario").insert({
        nombre: usuario.nombre,
        clave: hash,
        perfil_id: usuario.perfil
    });
}

service.desactivar = async(id) => {
    await pg("usuario")
    .where("id",id)
    .update("activo",false);
}

service.actualizarClave = async (id, clave) => {
    const hash = await hashPassword(clave);
    await pg("usuario")
        .where("id",id)
        .update("clave", hash)
        .update("cambiar_clave",false);
}

module.exports = service;