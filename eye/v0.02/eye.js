var eye = {
    loader: {
        coreScripts: ['common', 'event', 'js', 'require', 'script', 'import'],
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
    }
};

eye.go = {};