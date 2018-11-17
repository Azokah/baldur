var config = require('../config/balder.config.json');

export function fetchApi(endPoint, payload = {}, method = 'GET', headers = {}) {
    
    if (!'Content-Type' in headers)
        headers.push( { 'Content-Type': 'application/x-www-form-urlencoded' } );

    //if (!'Authorization' in headers)
        //headers.push( { 'Authorization': 'Bearer ' + Auth.getToken() } );


    return new Promise(function (resolve, reject) {
        fetch(config.url_api + endPoint,
            {
                headers: headers,
                method: method,
            })
            .then((response) => {
                if (response.status == 200)
                    return response.json();
                else
                    return response;
            })
            .then((result) => {
                resolve(result);
            })
            .catch((er) => {
                reject(er);
            });
    });
};

/*
export function fetchPOST(){
    fetch('/api/form-submit-url', {
        method: 'POST',
        body: data,
    });
}   */