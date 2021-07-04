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

service.obtenerTodo = async () => {
    const query = await pg("perfil").select();
        console.log(query);
    return query;
}

module.exports = service;