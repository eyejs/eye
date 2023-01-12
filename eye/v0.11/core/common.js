var common = {
    existFunction: function (object, nameFunction) {
        if (typeof object === 'object') {
            if (typeof object[nameFunction] === "function") {
                return true;
            }
        }
        return false;
    },
    isDefined: function (thing) {
        if (typeof thing !== 'undefined' && thing !== null) {
            return true;
        }
        return false;
    },
    round: function (num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    },
    randomString: function (num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
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
    obj: function (id, object = eye.go) {
        if(eye.common.isDefined(object[id]) &&
            object[id].id == id){
                return object[id];
        } else if(!eye.common.isDefined(object.id)){
            for(var key in object){
                var elle = eye.common.obj(id, object[key]);
                if(elle != -1){
                    return elle;
                }
            }
        }
        return -1;
    },
    objectLength: function (object) {
        var counter = 0;
        for (prop in object) {
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
    },
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    check: {
        start: function (event, type, id) {
            eye.common.id(id).addEventListener(event, () => {
                eye.common.check.go(type, id);
            }, false);
        },
        go: function (type, id) {
            switch (type) {
                case 'numbers':
                    document.getElementById(id).value = document.getElementById(id).value.replace(/[A-Za-zñÑ'$!#%&()=?¡\-\/°<>@"|{}_,:;´+\[\]¿¨\*☺☻♥♦♣♠•◘◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ ¢áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ\s\t]/g, '');
                    break;
                case 'user':
                    document.getElementById(id).value = document.getElementById(id).value.replace(/[' ><,$!#%&()=?¡\/°"|{}:\-;´+¿\[\]¨\*☺☻♥♦♣♠•◘◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ ¢áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ\s\t]/g, '');
                    break;
                case 'letters':
                    document.getElementById(id).value = document.getElementById(id).value.replace(/[0-9',.$!#%&()=?¡\-\/<>@°"|{}_:;´+\[\]¿¨\*àèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ☺☻♥♦♣♠•◘◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼¢]/g, '');
                    break;
                case "pass":
                    break;
                default:
                    document.getElementById(id).value = document.getElementById(id).value.replace(/['<>$!#%&()=\-\/°"|{}_´+\[\]¨\*àèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜ☺☻♥♦♣♠•◘◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼]/g, '');
                    break;
            }
        }
    }
};

export {
    common
};