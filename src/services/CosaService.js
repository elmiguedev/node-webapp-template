const Cosa = require("./BaseDbModel")("cosa");
const service = {};

service.obtenerTodo = async () => {
    const query = await Cosa.query();
    console.log(query);
}

service.insertar = async (nombre) => {
    await Cosa.query().insert({
        nombre: nombre
    });
}

module.exports = service;