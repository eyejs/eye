function etxt(object, cod){
    for(let vars in object.vars){
        cod = cod.replaceAll('#='+vars, object.vars[vars]);
    }
    return cod;
}

function $(id) {
    return eye.common.id(id);
}

function tag(name) {
    return eye.common.tag(name);
}

function name(name){
    return eye.common.name(name);
}

function byClass(data) {
    return eye.common.byClass(data);
}

function obj(data) {
    return eye.common.obj(data);
}

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function isDefined(thing){
    if(typeof thing !== 'undefined' && thing !== null){
        return true;
    }
    return false;
}

function existFunction(object, nameFunction){
    if(typeof object === 'object'){
        if (typeof object[nameFunction] === "function") {
            return true;
        }
    }
    return false;
}

const  randomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

eye.common = {
    id: function (id) {
        return document.getElementById(id);
    },
    tag: function (tag) {
        return document.body.getElementsByTagName(tag);
    },
    name: function (name) {
        return document.getElementsByName(name);
    },
    byClass: function (data) {
        return document.getElementsByClassName(data);
    },
    obj: function (data) {
        return eye.go[data];
    },
    objectLength: function(object){
        var counter = 0;
        for(prop in object){
            counter++;
        }
        return counter;
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
    }
};