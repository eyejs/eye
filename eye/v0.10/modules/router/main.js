function link(id) {
    if (eye.common.isDefined(eye.router.data[id])) {
        var go = eye.router.data[id];
        history.pushState(go, "", "index.html?" + go.route);
        eye.router.methods.newTab(go);
    }
};

var router = {
    go: function (go) {},
    back: function (state) {},
    vars: {
        tabs: {}
    },
    methods: {
        newTab: function (data) {

            var ne = document.createElement('eye');
            ne.setAttribute('src', data.file);
            ne.setAttribute('id', data.id);
            ne.setAttribute('props', JSON.stringify(data.props));

            var eyearea = eye.common.tag('eyearea')[0];
            eyearea.innerHTML = "";
            eyearea.appendChild(ne);

            eye.eImport.start(eyearea, function (data) {
                eye.router.vars.tabs[data.id] = {
                    id: data.id,
                    route: data.route,
                    file: data.file,
                    go: eye.go,
                    element: eye.common.id(data.id)
                };

                eye.router.vars.tabs[data.id].go = eye.go;
                eye.go = eye.router.vars.tabs[data.id].go;
            });


        }
    },
    start: function (id) {

        var eyearea = document.createElement('eyearea');
        document.body.appendChild(eyearea);

        window.onpopstate = (event) => {
            history.pushState(event.state, "", "index.html?" + event.state.route);
            eye.router.back(event.state);
        };

        history.pushState({
            route: 'inicio',
            copy: 2
        }, "", "index.html");
        history.pushState({
            route: 'inicio',
            campo: 4
        }, "", "index.html");

        eye.link(id);
    }
};

eye.router = router;
eye.link = link;