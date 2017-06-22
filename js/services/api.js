import Util from '../providers/util';
import UserStorage from '../storages/user.storage';

class ApiService {

    api_url = "http://chaira.udla.edu.co/api_almacen/api/chaira-app";
    context;

    constructor(context) {
        this.context = context;
    }

    GET(path, url) {
        this.context.props.indexState({ loading: true });
        return UserStorage.getUser().then((data) => {
            let url_exist = url;
            url = (url) ? url : this.api_url;
            console.log(url + path);
            return fetch(url + path, 
            ((!url_exist)? { method: 'GET', headers: { "Authorization": (data)? data.token: null } } : { method: 'GET' }))
                .then((response) => {
                    this.context.props.indexState({ loading: false });
                    return response.json();
                })
                .then((responseJson) => {
                    this.context.props.indexState({ loading: false });
                    return responseJson;
                })
                .catch(error => { this.handleError(error); });
        });
    }

    POST(path, params, url) {
        this.context.props.indexState({ loading: true });
        return UserStorage.getUser().then((data) => {
            let url_exist = url;
            url = (url) ? url : this.api_url;
            console.log(url + path);
            return fetch(url + path,
                    ((!url_exist) ? { method: 'POST', body: JSON.stringify(params), headers: { 'Accept': 'application/json', "content-type": "application/json", "Authorization": (data)? data.token: null } } : { method: 'POST', body: JSON.stringify(params) }))
                .then((response) => {
                    this.context.props.indexState({ loading: false });
                    return response.json();
                })
                .then((responseJson) => {
                    this.context.props.indexState({ loading: false });
                    return responseJson;
                })
                .catch(error => { this.handleError(error); });
        });
    }

    handleError(error) {
        console.log(error);
        let description = "No es posible conectarse con el servidor";
        Util.notification(description, 'danger');
        this.context.props.indexState({ loading: false });
        return { state: 'catch', description: description, debug: error };
    }
}

export default (ApiService);
