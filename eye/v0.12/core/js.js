/**
 * Carga y ejecuta un archivo JavaScript de forma asíncrona utilizando Fetch API.
 * @function js
 * @param {string} url - La URL del archivo JavaScript que se desea cargar y ejecutar.
 */
const js = function (url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            eval(data);
        });
};

export { js };
