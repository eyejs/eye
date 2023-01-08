var js = function (url) {
    fetch(url).then(function (response) {
        response.text().then(data => {
            eval(data);
        });
    });
};

export {
    js
};