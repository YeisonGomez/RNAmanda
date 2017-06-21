import Util from '../providers/util';

class ApiService {

    api_url = "http://chaira.udla.edu.co/api_almacen/api/chaira-app";
    context;

    constructor(context) {
        this.context = context;    
    }

    GET(path, url) {
        url = (url) ? url : this.api_url;
        console.log(url + path);
        return fetch(url + path, {
            method: 'GET'
        });
    }

    POST(path, params, url) { 
        this.context.props.indexState({ loading: true });
        url = (url) ? url : this.api_url;
        console.log(url + path);
        console.log(params);
        return fetch(url + path, {
                method: 'POST',
                body: JSON.stringify(params)
            })
            .then((response) => { this.context.props.indexState({ loading: false }); return response.json(); })
            .then((responseJson) => { this.context.props.indexState({ loading: false }); return responseJson; })
            .catch(this.handleError);;
    }

    handleError(error) {
        let description = "No es posible conectarse con el servidor";
        Util.notification(description,  'danger'); 
        this.context.props.indexState({ loading: false });
        return { state: 'catch', description: description, debug: error };
    }
}

export default (ApiService);