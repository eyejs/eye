eye.link = function (id) {
    if (eye.common.isDefined(eye.router.data[id])) {
        var go = eye.router.data[id];
        history.pushState(go, "", "index.html?p=" + go.id);
        eye.router.newTab(go);
    }
};

eye.router = {
    go: function (go) {},
    back: function (state) {
        eye.link(state.id);
    },
    newTab: function (data) {
        var ne = document.createElement('eye');
        ne.setAttribute('src', data.file);
        ne.setAttribute('id', data.id);
        ne.setAttribute('props', JSON.stringify(data.props));

        if(eye.common.isDefined(data.route)){
            ne.setAttribute('route', data.route);
        }

        var eyearea = eye.common.tag('eyearea')[0];
        eyearea.innerHTML = "";
        eyearea.appendChild(ne);

        eye.eImport.start(eyearea);
    },
    start: function (id) {

        var eyearea = document.createElement('eyearea');
        document.body.appendChild(eyearea);

        window.onpopstate = (event) => {
            history.pushState(event.state, "", "index.html?p=" + event.state.id);
            eye.router.back(event.state);
        };

        history.pushState({
            route: 'inicio'
        }, "", "index.html");
        history.pushState({
            route: 'inicio'
        }, "", "index.html");

        eye.link(id);
    }
};