const Usuario = require("./BaseDbModel")("usuario");
const service = {};

service.obtenerUno = async (usuario, clave) => {
    const query = await Usuario.query()
        .where("nombre", "=",usuario)
        .andWhere("clave","=",clave)
        .first();
    return query;
}

module.exports = service;