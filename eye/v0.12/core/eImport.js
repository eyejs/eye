/**
 * Objeto que contiene funciones para manejar importaciones de elementos 'eye'.
 * @namespace eImport
 */
const eImport = {
    /**
     * Inicia la importación de elementos 'eye' en el DOM.
     * @function start
     * @memberof eImport
     * @param {HTMLElement} [root=document.body] - El elemento raíz del DOM en el que se buscarán elementos 'eye' (por defecto, document.body).
     */
    start: function (root = document.body) {
        const eyeElements = root.getElementsByTagName('eye');

        for (let x = 0; x < eyeElements.length; x++) {
            const element = eyeElements[x];
            let src = "";

            if (element.hasAttribute('src')) {
                src = element.getAttribute('src');

                for (let y = 0, clon = 0; y < eyeElements.length; y++) {
                    if (eyeElements[y].hasAttribute('src') && src === eyeElements[y].getAttribute('src')) {
                        eyeElements[y].setAttribute('clon', clon);
                        clon++;
                    }
                }
                eye.requi.start(src, element);
            }
        }
    }
};

export { eImport };
