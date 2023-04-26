/**
 * Función para navegar a una página utilizando su identificador.
 * @function link
 * @param {string} id - Identificador de la página a la que se desea navegar.
 */
eye.link = function (id) {
    if (eye.common.isDefined(eye.router.data[id])) {
        const go = eye.router.data[id];
        history.pushState(go, "", `./?page=${go.id}`);
        eye.router.newTab(go);
    }
};

eye.router = {
    /**
     * Método vacío para navegar a una página.
     * @function go
     * @param {Object} go - Objeto que contiene información sobre la página a la que se desea navegar.
     */
    go: function (go) {},

    /**
     * Función para navegar a una página previamente visitada.
     * @function back
     * @param {Object} state - Objeto que contiene información sobre la página a la que se desea volver.
     */
    back: function (state) {
        eye.link(state.id);
    },

    /**
     * Función para crear una nueva pestaña y cargar una página en ella.
     * @function newTab
     * @param {Object} data - Objeto que contiene información sobre la página a cargar en la nueva pestaña.
     */
    newTab: function (data) {
        const ne = document.createElement('eye');
        ne.setAttribute('src', data.file);
        ne.setAttribute('id', data.id);
        ne.setAttribute('props', JSON.stringify(data.props));

        if (eye.common.isDefined(data.route)) {
            ne.setAttribute('route', data.route);
        }

        const eyearea = eye.common.tag('eyearea')[0];
        eyearea.innerHTML = "";
        eyearea.appendChild(ne);

        eye.eImport.start(eyearea);
    },

    /**
     * Función para iniciar el enrutador y cargar una página específica.
     * @function start
     * @param {string} id - Identificador de la página a cargar.
     */
    start: function (id) {
        const eyearea = document.createElement('eyearea');
        document.body.appendChild(eyearea);

        window.onpopstate = (event) => {
            history.pushState(event.state, "", `./?page=${event.state.id}`);
            eye.router.back(event.state);
        };

        let page = eye.common.getParameterByName("page");

        if (page == -1) {
            page = id;
        }
        eye.link(page);

        history.pushState({ route: page }, "", `./?page=${page}`);
        history.pushState({ route: page }, "", `./?page=${page}`);
    }
};
