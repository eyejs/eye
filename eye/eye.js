function $(id) {
    return eye.common.id(id);
}

function tag(name) {
    return eye.common.tag(name);
}

function byClass(data) {
    return eye.common.byClass(data);
}

function obj(id) {
    return eye.common.route.getObjectById(id);
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

var eye = {
    loader: {
        coreScripts: ['common', 'do', 'event', 'require', 'script', 'import'],
        coreScript: "",
        coreLoader: function (mainRoute) {
            for (let i = 0; i < this.coreScripts.length; i++) {
                let route = mainRoute + "core/" + this.coreScripts[i] + ".js";
                fetch(route).then(function (response) {
                    response.text().then(data => {
                        eye.loader.coreScript += data +"\n";
                        if (eye.loader.checker()) {
                            delete eye.start;
                            delete eye.loader;
                            eye.import.start();  
                        }
                    });
                });
            }
        },
        loadedScripts: 0,
        checker: function () {
            this.loadedScripts++;
            if (this.loadedScripts >= this.coreScripts.length) {
                eval(this.coreScript);
                return true;
            }
            return false;
        },
    },
    start: function (mainRoute) {
        eye.loader.coreLoader(mainRoute);
    },
};

eye.go = {};
eye.back = {};