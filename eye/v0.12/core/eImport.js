var eImport = {
    start: function (root = document.body) {
        let eyeElements = root.getElementsByTagName('eye');
        for (var x = 0; x < eyeElements.length; x++) {
            var element = eyeElements[x];
            var src = "";
            if (element.hasAttribute('src')) {
                src = element.getAttribute('src');
                for (var y = 0, clon = 0; y < eyeElements.length; y++) {
                    if (eyeElements[y].hasAttribute('src')) {
                        if (src == eyeElements[y].getAttribute('src')) {
                            eyeElements[y].setAttribute('clon', clon);
                            clon++;
                        }
                    }
                }
                eye.requi.start(src, element);
            }
        }
    }
};

export {
    eImport
};