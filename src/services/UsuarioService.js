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

service.obtenerPorUsuarioClave = async (usuario,clave) => {
    const query = await pg("usuario")
        .where("nombre",usuario)
        .where("clave",clave)
        .andWhere("activo",true)
        .first();
        console.log(query);
    return query;
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
    await pg("usuario").insert({
        nombre: usuario.nombre,
        clave: usuario.nombre,
        perfil_id: usuario.perfil
    });
}

service.desactivar = async(id) => {
    await pg("usuario")
    .where("id",id)
    .update("activo",false);
}

service.actualizarClave = async (id, clave) => {
    await pg("usuario")
        .where("id",id)
        .update("clave",clave)
        .update("cambiar_clave",false);
}

module.exports = service;