eye.do = function (id, okFunction, errorFunction = () => {}) {
    let element = $(id);
    let time = setInterval(() => {
        element = $(id);
        if (typeof element !== 'undefined' && element !== null) {
            clearInterval(time);
            okFunction(element);
        }
    }, 300);
    setTimeout(() => {
        if (typeof element === 'undefined' || element === null) {
            console.error("Element not found");
        }
        clearInterval(time);
        errorFunction();
    }, 15000);
};