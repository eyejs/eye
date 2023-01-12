eye.link = function (id) {
    if (eye.common.isDefined(eye.router.data[id])) {
        var go = eye.router.data[id];
        history.pushState(go, "", "./?page=" + go.id);
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
            history.pushState(event.state, "", "./?page=" + event.state.id);
            eye.router.back(event.state);
        };

        var page = eye.common.getParameterByName("page");

        if(page == ''){
            page = id;
        }
        eye.link(page);

        history.pushState({
            route: page
        }, "", "./?page=" + page);
        history.pushState({
            route: page
        }, "", "./?page=" + page);

    }
};