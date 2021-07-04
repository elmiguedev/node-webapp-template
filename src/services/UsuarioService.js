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

service.obtenerUno = async (usuario, clave) => {
    const query = await pg("usuario")
        .where("nombre",usuario)
        .andWhere("clave",clave)
        .andWhere("activo",true)
        .first();
    
        console.log(query);
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
        perfil_id: usuario.perfil,
        clave: "123456"
    });
}

service.desactivar = async(id) => {
    await pg("usuario")
    .where("id",id)
    .update("activo",false);
}

module.exports = service;