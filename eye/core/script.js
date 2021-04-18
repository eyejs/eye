eye.script = function (json) {

    if (typeof json !== 'object') {
        throw new Error("The parameter has to be a json object");
    }

    if (typeof json.onBeforeCreate === "function") {
        json.onBeforeCreate();
        delete json.onBeforeCreate;
    }

    if (!isDefined(json.id)) {
        throw new Error("The id variable is missing in the json object");
    }

    let back = eye['back'];
    let object = eye['go'];

    if (typeof json['route'] == 'string') {
        route = json['route'].split(".");
        
        for (let i = 0; i < route.length - 1; i++) {
            if (typeof object[route[i]] === 'undefined') {
                back[route[i]] = {};
                object[route[i]] = {};
                
            }
            back = back[route[i]];
            object = object[route[i]]; 
        }
        back[route[route.length - 1]] = {};
        object[route[route.length - 1]] = eye.common.cloneObject(json);
        object = object[route[route.length - 1]];
        
    } else {
        back[json['id']] = {};
        object[json['id']] = eye.common.cloneObject(json);
        object = object[json['id']];
    }

    if (typeof object.onCreate === "function") {
        object.onCreate(object);
        delete object.onCreate;
    }

    return object;
};
