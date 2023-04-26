/**
 * Añade un evento a un elemento y vincula la función especificada con parámetros opcionales.
 * @function event
 * @param {HTMLElement} element - El elemento al que se le añadirá el evento.
 * @param {Object} object - El objeto que contiene el método a ejecutar.
 * @param {string} event - El tipo de evento que se quiere añadir (por ejemplo, 'click', 'change', etc.).
 * @param {string} nameFunction - El nombre de la función del objeto a ejecutar.
 * @param {*} [parameters=undefined] - Los parámetros opcionales que se pasarán a la función (por defecto, undefined).
 */
const event = function (element, object, event, nameFunction, parameters = undefined) {
    element.addEventListener(event, () => {
        object.methods[nameFunction](object, parameters);
    });
};

export { event };
