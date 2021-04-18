eye.common = {
    id: function (id) {
        return document.getElementById(id);
    },
    tag: function (tag) {
        return document.body.getElementsByTagName(tag);
    },
    byClass: function (data) {
        return document.getElementsByClassName(data);
    },
    cloneObject: function (object) {
        if (typeof object !== 'undefined' && object !== null) {
            let clone = {};
            for (var key in object) {
                var value = object[key];
                if (typeof value != 'object') {
                    clone[key] = value;
                } else {
                    clone[key] = eye.common.cloneObject(value);
                }
            }
            return clone;
        }
    },
    includeAttributes: function (div, attributes) {
        for (let i = 0, att; att = attributes[i]; i++) {
            div.setAttribute(att.name, att.value);
        }
        return div;
    },
    route: {
        getObjectById: function (id) {
            return eye.common.route.getObject(eye.common.route.getStringRoute(id).route);
        },
        getStringRoute: function (id, object = undefined, route = "") {
            let ob = object;
            if (typeof object == 'undefined') {
                ob = eye['go'];
            }
            for (let i in ob) {
                let initialRoute = route;
                if (typeof ob['id'] !== undefined) {
                    if (ob['id'] == id) {
                        return {
                            route: route
                        };
                    } else {
                        if (route != "") {
                            route = route + "." + i;
                        } else {
                            route = i;
                        }
                        if (typeof ob[i] == 'object' && i !== '$') {
                            let res = eye.common.route.getStringRoute(id, ob[i], route);
                            if (typeof res == 'object') {
                                return res;
                            }
                        }
                    }
                }
                route = initialRoute;
            }
            return false;
        },
        getObject: function (route, id) {
            if (typeof route == "string") {
                route = route.split(".");
                array = eye['go'];
                response = undefined;
                for (var i = 0; i < route.length; i++) {
                    if (typeof array[route[i]] !== "undefined" && array[route[i]] !== null) {
                        array = array[route[i]];
                        response = array;
                    }
                }

                return response;
            }
            return undefined;
        },
    }
};