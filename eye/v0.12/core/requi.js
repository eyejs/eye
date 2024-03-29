/**
 * Objeto que contiene funciones para gestionar y cargar componentes.
 * @namespace requi
 */
const requi = {
    /**
     * Verifica si existe un objeto y una función dentro de ese objeto y la ejecuta.
     * @function check
     * @memberof requi
     * @param {Object} object - El objeto que contiene la función.
     * @param {string} nameFunction - El nombre de la función que se desea ejecutar.
     * @param {boolean} [deleteFunction=true] - Indica si se debe eliminar la función después de ejecutarla.
     * @param {*} [data] - Datos que se pasan como parámetro a la función.
     */
    check: function (object, nameFunction, deleteFunction = true, data) {
        if (eye.common.isDefined(object)) {
            if (eye.common.existFunction(object, nameFunction)) {
                if (!eye.common.isDefined(data)) {
                    data = "";
                }
                object[nameFunction](object, data);
                if (deleteFunction) {
                    delete object[nameFunction];
                }
            }
        }
    },
    /**
     * Inicia la carga de un componente a través de una URL y un elemento.
     * @function start
     * @memberof requi
     * @param {string} url - La URL del componente a cargar.
     * @param {Element} element - El elemento en el que se cargará el componente.
     */
    start: function (url, element) {

        fetch(url).then(function (response) {
            response.text().then(data => {

                let html = document.createElement('div');
                html.innerHTML = data;
                let object = {};
                let cod = "";
                let scriptCode = "";
                for (var x = 0, scri; scri = html.getElementsByTagName('script')[x]; x++) {
                    if (scri.hasAttribute('code')) {
                        scriptCode += scri.innerHTML;
                    } else {
                        cod += scri.innerHTML;
                    }
                }
                eval(cod);

                if (scriptCode != "") {
                    object = eye.script(eval(scriptCode));
                }

                let style = html.getElementsByTagName('style')[0];
                if (eye.common.isDefined(style)) {
                    let styleTag = document.createElement('style');
                    styleTag.innerHTML = style.innerHTML;
                    if((document.body.getElementsByTagName('eyearea')[0] == null || 
                    document.body.getElementsByTagName('eyearea')[0] == 'undefined') ||
                    (element.hasAttribute('router') && element.getAttribute('router') == "false")){
                        document.head.appendChild(styleTag);
                    }else{
                        document.body.getElementsByTagName('eyearea')[0].appendChild(styleTag);
                    }
                    eye.requi.check(object, 'onLoadedStyles');
                }

                eye.requi.check(object, 'onbeforeShowing');
                let wrapper = html.getElementsByTagName('wrapper')[0];
                if (eye.common.isDefined(wrapper)) {
                    if (element.hasAttribute('id')) {
                        object.id = element.getAttribute('id');
                    } else if (eye.common.isDefined(object.id)) {
                        element.setAttribute('id', object.id + "" + element.getAttribute('clon'));
                        object.id = object.id + "" + element.getAttribute('clon');
                    }

                    object.route = "";
                    if (element.hasAttribute('route')) {
                        object.route = element.getAttribute('route');
                    }

                    let newOb = eye.common.cloneObject(object);
                    eye.requi.save({
                        newOb: newOb,
                        wrapper: wrapper,
                        element: element
                    });
                }
            });
        });
    },
    /**
     * Guarda el componente cargado en la ruta correspondiente del objeto `eye.go`.
     * @function save
     * @memberof requi
     * @param {Object} data - Objeto con datos para guardar y mostrar el componente.
     */
    save: function (data) {
        var route = eye.go;
        if (data.element.hasAttribute('route')) {
            var txtRoute = data.element.getAttribute('route');
            data.element.removeAttribute('route');
            var arr = txtRoute.split(".");
            for (var x = 0; x < arr.length; x++) {
                if (!eye.common.isDefined(route[arr[x]])) {
                    route[arr[x]] = {};
                }
                route = route[arr[x]];
            }
        }
        route[data.newOb.id] = eye.requi.show(data.newOb, data.wrapper, data.element);
    },
    /**
     * Muestra el componente cargado en el elemento especificado.
     * @function show
     * @memberof requi
     * @param {Object} object - El objeto del componente cargado.
     * @param {Element} wrapper - El elemento contenedor del componente.
     * @param {Element} element - El elemento en el que se cargará el componente.
     * @returns {Object} - Devuelve el objeto del componente.
     */
    show: function (object, wrapper, element) {
        function attribts(element, wrapper, object) {
            if (element.hasAttribute("props")) {
                try {
                    var props = JSON.parse(element.getAttribute('props'));
                    object.props = props;
                } catch (error) {
                    console.error(error);
                }
            }

            for (let i = 0, att; att = element.attributes[i]; i++) {
                if (att.name !== 'src' && att.name !== 'props') {
                    if (att.name == 'class') {
                        for (let i = 0, cl; cl = att.value.split(" ")[i]; i++) {
                            if (cl !== "") {
                                wrapper.classList.add(cl);
                            }
                        }
                    } else {
                        wrapper.setAttribute(att.name, att.value);
                    }
                }
            }

            let html = wrapper.innerHTML;
            let attributes = wrapper.attributes;
            wrapper = document.createElement('div');
            wrapper = eye.common.includeAttributes(wrapper, attributes);
            wrapper.innerHTML = html;
            return wrapper;
        }

        let newElement = attribts(element, wrapper, object);

        if (element == document.body) {
            document.body.replaceChild(newElement, element);
        } else {
            element.parentNode.replaceChild(newElement, element);
        }

        newElement.innerHTML = newElement.innerHTML.replaceAll(/e-(\w+) *= *"([\w_\(\)]+)"/g, '$1="#$2"');
        newElement.innerHTML = newElement.innerHTML.replaceAll(/{{(\w+)}}/g, '<etxt name="' + object.id + '_$1">#$1</etxt>');

        for (var prop in object.props) {
            if (eye.common.isDefined(object.vars[prop])) {
                object.vars[prop] = object.props[prop];
                delete object.props[prop];
            } else {
                newElement.innerHTML = newElement.innerHTML.replaceAll('@' + prop, object.props[prop]);
            }
        }

        for (var vars in object.vars) {
            newElement.innerHTML = newElement.innerHTML.replaceAll('#' + vars, object.vars[vars]);
        }

        newElement.innerHTML = newElement.innerHTML.replaceAll('[id]', object.id);
        newElement.innerHTML = newElement.innerHTML.replaceAll('[root]', eye.root);

        eye.requi.check(object, 'onShown', false);
        eye.eImport.start(newElement);

        return object;
    }
};

export {
    requi
};