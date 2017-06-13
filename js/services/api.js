import Util from '../providers/util';

class ApiService {

    api_url = "https://jsonplaceholder.typicode.com";

    GET(path, url) {
        url = (url) ? url : this.api_url;
        console.log(url + path);
        return fetch(url + path, {
            method: 'GET'
        });
    }

    POST(path, params, url) {
        url = (url) ? url : this.api_url;
        console.log(url + path);
        console.log(params);
        return fetch(url + path, {
                method: 'POST',
                body: JSON.stringify(params)
            })
            .then((response) => { return response.json(); })
            .then((responseJson) => { return responseJson; })
            .catch(this.handleError);;
    }

    handleError(error) {
        let description = "No es posible conectarse con el servidor";
        Util.notification(description,  'danger'); 
        return { state: 'catch', description: description, debug: error };
    }
}

export default (new ApiService);