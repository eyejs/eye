var script = function (json) {

    if (typeof json !== 'object') {
        throw new Error("The parameter has to be a json object");
    }

    if (typeof json.onBeforeCreate === "function") {
        json.onBeforeCreate();
        delete json.onBeforeCreate;
    }

    if (!eye.common.isDefined(json.id)) {
        throw new Error("The id variable is missing in the json object");
    }

    let object = eye.common.cloneObject(json);

    if (typeof object.onCreate === "function") {
        object.onCreate(object);
        delete object.onCreate;
    }

    return object;
};

export {
    script
};