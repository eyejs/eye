/**
 * Función para crear un objeto a partir de un JSON y ejecutar ciertas funciones del ciclo de vida.
 * @function script
 * @param {Object} json - Objeto JSON que contiene la configuración y las funciones del objeto a crear.
 * @returns {Object} - Devuelve el objeto creado con las propiedades y funciones del JSON.
 * @throws {Error} - Lanza un error si el parámetro proporcionado no es un objeto JSON o si falta la propiedad 'id'.
 */
const script = function (json) {

    if (typeof json !== 'object') {
        throw new Error("El parámetro debe ser un objeto JSON");
    }

    if (typeof json.onBeforeCreate === "function") {
        json.onBeforeCreate();
        delete json.onBeforeCreate;
    }

    if (!eye.common.isDefined(json.id)) {
        throw new Error("La variable id falta en el objeto JSON");
    }

    let object = eye.common.cloneObject(json);

    if (typeof object.onCreate === "function") {
        object.onCreate(object);
        delete object.onCreate;
    }

    return object;
};

export { script };