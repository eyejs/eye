eye.js = function (url) {
    console.log(url);
    fetch(url).then(function (response) {
        response.text().then(data => {
            eval(data);
        });
    });
};