import ApiService from './api';
import OauthStorage from '../storages/auth.storage';

class UserService {

    constructor(context){
        this.apiService = new ApiService(context);  
    }

    login() {
        return this.apiService.POST('/oauth2/authorize.asmx/token', {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: this.redirect_uri,
            client_id: this.client_id,
            client_secret: this.client_secret,
            state: 'OK'
        });
    }
}

export default (UserService);
