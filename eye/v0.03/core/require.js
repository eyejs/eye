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
    start: function(url, element){

        fetch(url).then(function (response) {
            response.text().then(data => {

                let html = document.createElement('div');
                html.innerHTML = data;
                let object = {};
                let  cod = "";
                let scriptCode = "";
                for(var x = 0, scri; scri = html.getElementsByTagName('script')[x]; x++){
                    if(scri.hasAttribute('code')){
                        scriptCode += scri.innerHTML;
                    }else{
                        cod += scri.innerHTML;
                    }
                }
                eval(cod);

                if(scriptCode != ""){
                    eval(scriptCode);
                    if(isDefined(code)){
                        object = eye.script(code);
                    } 
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
                    if(element.hasAttribute('id')){
                        object.id = element.getAttribute('id');
                    } else if (isDefined(object.id)){
                        element.setAttribute('id', object.id + "" + element.getAttribute('clon'));
                        object.id = object.id + "" + element.getAttribute('clon');
                    }

                    let newOb = eye.common.cloneObject(object);
    
                    eye['go'][object.id] = eye.require.show(newOb, wrapper, element);
                    
                }

            });
        });
    },
    show: function (object, wrapper, element) {

        function attribts(element, wrapper, object) {
            if (element.hasAttribute("props")) {
                try {
                    var props = JSON.parse(element.getAttribute('props'));
                    object.props = props;
                } catch (error) {
                    console.error(error);
                }
            }

            for (let i = 0, att; att = element.attributes[i]; i++) {
                if (att.name !== 'src' && att.name !== 'props') {
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

        let newElement = attribts(element, wrapper, object);
        
       
        if(element == document.body){
            document.body.replaceChild(newElement, element);
        }else{
            element.parentNode.replaceChild(newElement, element);
        }
        
        newElement.innerHTML = newElement.innerHTML.replaceAll(/e-(\w+) *= *"([\w_\(\)]+)"/g, '$1="#$2"');
        newElement.innerHTML = newElement.innerHTML.replaceAll(/{{(\w+)}}/g, '<etxt name="'+object.id+'_$1">#$1</etxt>');
            
        
        for (prop in object.props) {
            if(isDefined(object.vars[prop])){
                object.vars[prop] = object.props[prop];
                delete object.props[prop];
            } else{
                newElement.innerHTML = newElement.innerHTML.replaceAll('@'+prop, object.props[prop]);
            }  
        }

        for (vars in object.vars) {      
            newElement.innerHTML = newElement.innerHTML.replaceAll('#'+vars, object.vars[vars]);
        }

        newElement.innerHTML = newElement.innerHTML.replaceAll('[id]', object.id);

        eye.require.check(object, 'onShown', false);
        eye.import.start(newElement);

        return object;
    }
};