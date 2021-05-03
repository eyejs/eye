eye.event = function (id, event, nameFunction, parameters = undefined) {
    eye.do(id, (element) =>{
        element.addEventListener(event, ()=>{
            nameFunction(eye.common.route.getObjectById(id), parameters)
        });
    }, parameters);
};