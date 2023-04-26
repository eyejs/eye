/**
 * Objeto que contiene funciones comunes para ser reutilizadas.
 * @namespace common
 */
const common = {
    /**
     * Realiza un desplazamiento suave hasta un elemento con el id proporcionado.
     * @function move
     * @memberof common
     * @param {string} name - El id del elemento al que se desea desplazar.
     */
    move: function (name) {
        const offsetTop = document.getElementById(name).offsetTop;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    },

    /**
     * Verifica si una función existe dentro de un objeto.
     * @function existFunction
     * @memberof common
     * @param {object} object - El objeto en el que se busca la función.
     * @param {string} nameFunction - El nombre de la función que se desea verificar.
     * @returns {boolean} Retorna true si la función existe, false en caso contrario.
     */
    existFunction: function (object, nameFunction) {
        return typeof object === 'object' && typeof object[nameFunction] === "function";
    },

    /**
     * Verifica si una variable está definida y no es null.
     * @function isDefined
     * @memberof common
     * @param {*} thing - La variable que se desea verificar.
     * @returns {boolean} Retorna true si la variable está definida y no es null, false en caso contrario.
     */
    isDefined: function (thing) {
        return typeof thing !== 'undefined' && thing !== null;
    },

    /**
     * Redondea un número a dos decimales.
     * @function round
     * @memberof common
     * @param {number} num - El número que se desea redondear.
     * @returns {number} Retorna el número redondeado a dos decimales.
     */
    round: function (num) {
        const m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    },

    /**
     * Genera una cadena aleatoria de caracteres alfanuméricos.
     * @function randomString
     * @memberof common
     * @param {number} num - La longitud de la cadena que se desea generar.
     * @returns {string} Retorna la cadena aleatoria de caracteres alfanuméricos.
     */
    randomString: function (num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    // Métodos abreviados para seleccionar elementos del DOM
    id: id => document.getElementById(id),
    tag: tag => document.body.getElementsByTagName(tag),
    name: name => document.getElementsByName(name),
    byClass: data => document.getElementsByClassName(data),
    /**
     * Busca un objeto por id en una estructura de objetos anidados.
     * @function obj
     * @memberof common
     * @param {string} id - El id del objeto que se busca.
     * @param {object} object - El objeto en el que se realizará la búsqueda (por defecto, eye.go).
     * @returns {object|-1} Retorna el objeto encontrado o -1 si no se encuentra el objeto.
     */
    obj: function (id, object = eye.go) {
        if(common.isDefined(object[id]) &&
            object[id].id === id){
                return object[id];
        } else if(!common.isDefined(object.id)){
            for(const key in object){
                const elle = common.obj(id, object[key]);
                if(elle !== -1){
                    return elle;
                }
            }
        }
        return -1;
    },

    /**
     * Calcula la cantidad de propiedades en un objeto.
     * @function objectLength
     * @memberof common
     * @param {object} object - El objeto del cual se desea contar las propiedades.
     * @returns {number} Retorna la cantidad de propiedades en el objeto.
     */
    objectLength: function (object) {
        return Object.keys(object).length;
    },

    /**
     * Crea una copia profunda de un objeto.
     * @function cloneObject
     * @memberof common
     * @param {object} object - El objeto que se desea clonar.
     * @returns {object|undefined} Retorna el objeto clonado o undefined si el objeto no está definido o es null.
     */
    cloneObject: function (object) {
        if (common.isDefined(object)) {
            let clone = {};
            for (const key in object) {
                const value = object[key];
                clone[key] = typeof value !== 'object' ? value : common.cloneObject(value);
            }
            return clone;
        }
    },

    /**
     * Incluye atributos a un elemento DOM.
     * @function includeAttributes
     * @memberof common
     * @param {HTMLElement} div - El elemento al cual se le agregarán los atributos.
     * @param {Array} attributes - Un array de objetos con propiedades 'name' y 'value' que representan los atributos.
     * @returns {HTMLElement} Retorna el elemento con los atributos agregados.
     */
    includeAttributes: function (div, attributes = []) {
        for (let i = 0, att; att = attributes[i]; i++) {
            div.setAttribute(att.name, att.value);
        }
        return div;
    },

    /**
     * Obtiene el valor de un parámetro de la URL por su nombre.
     * @function getParameterByName
     * @memberof common
     * @param {string} name - El nombre del parámetro que se desea obtener.
     * @returns {string|-1} Retorna el valor del parámetro o -1 si no se encuentra.
     */
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? -1 : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    /**
     * Objeto que contiene funciones para validar y restringir la entrada de datos en campos de formulario.
     * @namespace check
     * @memberof common
     */
    check: {
        /**
         * Inicia la validación y restricción de la entrada de datos para un campo de formulario.
         * @function start
         * @memberof common.check
         * @param {string} event - El evento en el que se ejecutará la función de validación (por ejemplo, 'input').
         * @param {string} type - El tipo de validación que se aplicará ('numbers', 'user', 'letters', 'pass', 'false').
         * @param {string} id - El id del campo de formulario que se desea validar.
         */
        start: function (event, type, id) {
            common.id(id).addEventListener(event, () => {
                common.check.go(type, id);
            }, false);
        },

        /**
         * Realiza la validación y restricción de la entrada de datos para un campo de formulario.
         * @function go
         * @memberof common.check
         * @param {string} type - El tipo de validación que se aplicará ('numbers', 'user', 'letters', 'pass', 'false').
         * @param {string} id - El id del campo de formulario que se desea validar.
         */
        go: function (type, id) {
            const inputElement = common.id(id);
            switch (type) {
                case 'numbers':
                    inputElement.value = inputElement.value.replace(/[^\d]/g, '');
                    break;
                case 'user':
                    inputElement.value = inputElement.value.replace(/[' ><,$!#%&()=?¡\/°"|{}:\-;´+¿\[\]¨\*☺☻♥♦♣♠•◘◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ ¢áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ\s\t]/g, '');
                    break;
                case 'letters':
                    inputElement.value = inputElement.value.replace(/[^A-Za-zñÑ\s]/g, '');
                    break;
                case "pass":
                case "false":
                    break;
                default:
                    inputElement.value = inputElement.value.replace(/['<>$!#%&()=\-\/°"|{}_´+\[\]¨\*àèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜ☺☻♥♦♣♠•◘◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼]/g, '');
                    break;
            }
        }
    }
};

export { common };

