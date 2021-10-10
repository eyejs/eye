eye.import = {
    start: function (parentElement) {
        let root = document.body;
        if (isDefined(parentElement)) {
            root = $(parentElement);
        }
        let eyeElements = eye.import.getEyeElements(root);
        for (let key in eyeElements) {
            eye.require.start(eyeElements[key], parentElement);
        }
    },
    getEyeElements: function (root) {

        let objectElement = function (type, src, root) {
            return {
                type: type,
                src: src,
                copys: [],
                clones: [],
                root: root
            };
        };
        
        let eyeElements = {}
        
        function add(array, element) {
            if (element.hasAttribute('id') && element.getAttribute('id') !== element.getAttribute('type')) {
                array.clones.push(element);
            } else {
                array.copys.push(element);
            }
            return array;
        }

        for (var i = 0, element; element = root.getElementsByTagName('eye')[i]; i++) {
            let src = element.getAttribute("src");
            let type = element.getAttribute("type");
            if (!isDefined(src) || !isDefined(type)) {
                throw new Error("eye tags must have src and type attributes");
            }
            if (isDefined(eyeElements[type])) {
                eyeElements[type] = add(eyeElements[type], element);
            } else {
                eyeElements[type] = objectElement(type, src, root);
                eyeElements[type] = add(eyeElements[type], element);
            }
        }
        return eyeElements;
    },

};