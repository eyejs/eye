var event = function (element, object, event, nameFunction, parameters = undefined) {
    element.addEventListener(event, () => {
        object.methods[nameFunction](object, parameters);
    });
};

export {
    event
};