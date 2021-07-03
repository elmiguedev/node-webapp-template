const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'root',
        database: 'Prueba'
    }
});
const { Model } = require('objection');
Model.knex(knex);

module.exports = (tabla) => {
    class Tabla extends Model {
        static get tableName() {
            return tabla;
        }
    }

    return Tabla;
}

