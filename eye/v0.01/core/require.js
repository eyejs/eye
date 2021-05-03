eye.require = {
    check: function (object, nameFunction, deleteFunction = true, data) {
        if (isDefined(object)) {
            if (existFunction(object, nameFunction)) {
                if (!isDefined(data)) {
                    data = "";
                }
                object[nameFunction](object, data);
                if (deleteFunction) {
                    delete object[nameFunction];
                }
            }
        }
    },
    start: function (eyeElements) {
        fetch(eyeElements.src).then(function (response) {
            response.text().then(data => {

                let html = document.createElement('div');
                html.innerHTML = data;

                let script = html.getElementsByTagName('script')[0];
                let object;
                if (isDefined(script)) {
                    object = eval(script.innerHTML);
                }

                let style = html.getElementsByTagName('style')[0];
                if (isDefined(style)) {
                    let styleTag = document.createElement('style');
                    styleTag.innerHTML = style.innerHTML;
                    document.head.appendChild(styleTag);
                    eye.require.check(object, 'onLoadedStyles');
                }

                eye.require.check(object, 'onbeforeShowing');
                let wrapper = html.getElementsByTagName('wrapper')[0];
                if (isDefined(wrapper)) {
                    eye.require.show(object, wrapper, eyeElements);
                }
            });
        });
    },
    show: function (object, wrapper, eyeElements) {

        let wrapperId;
        if (wrapper.hasAttribute('id')) {
            wrapperId = wrapper.getAttribute('id');
        } else {
            throw new Error("the id attribute of the wrapper tag is missing");
        }

        function attribts(element, wrapper, object) {
            if (element.hasAttribute("data")) {
                eye.require.check(object, 'onData', true, element.getAttribute('data'));
            }

            for (let i = 0, att; att = element.attributes[i]; i++) {
                if (att.name !== 'src' && att.name !== 'data' && att.name !== 'type') {
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


        for (let i = 0, element; element = eyeElements.copys[i]; i++) {
            let parentElement = wrapperId;
            if (i > 0) {
                parentElement = wrapperId + "-copy-" + i;
                element.setAttribute('id', wrapperId + "-copy-" + i);
            }
            let newElement = attribts(element, wrapper, object);

            eyeElements.root.replaceChild(newElement, element);
            eye.require.check(object, 'onShown', false);
            eye.import.start(parentElement);
        }

        for (let i = 0, element; element = eyeElements.clones[i]; i++) {

            let newObject = eye.require.createClone(element, object, i + 1);

            let newElement = attribts(element, wrapper, object);
            newElement.setAttribute('id', newObject.id);

            eyeElements.root.replaceChild(newElement, element);
            eye.require.check(newObject, 'onShown', false);
            eye.import.start(newObject.id);
        }
    },
    createClone: function (element, object, cloneNumber) {

        let newId = element.getAttribute('id');

        let route = object.route;
        let root = object.route;
        if (!isDefined(route)) {
            route = object.id;
        }

        let go = eye.go;
        let back = eye.back;

        let pointer = route.split('.');
        let last = object.id;

        for (let i = 0; i < pointer.length - 1; i++) {
            go = go[pointer[i]];
            back = back[pointer[i]];
            last = pointer[pointer.length - 1];
        }
        let temp = eye.common.cloneObject(object);

        if (cloneNumber <= 1) {
            go[last] = {};
            go = go[last];
            back[last] = {};
            back = back[last];
            if (isDefined(temp.route)) {
                temp.route = route + "." + temp.id;
            }
            go[temp.id] = temp;
            back[temp.id] = {};

        } else {
            if (pointer.length >= 1) {
                root = "";
                for (var i = 0; i < pointer.length - 2; i++) {
                    root += pointer[i] + ".";
                }

                root += pointer[pointer.length - 2];
            }
        }

        temp = eye.common.cloneObject(temp);
        temp.id = newId;
        if (isDefined(temp.route)) {
            temp.route = root + "." + newId;
        }

        go[newId] = eye.common.cloneObject(temp);
        back[newId] = {};

        return go[newId];
    },

};