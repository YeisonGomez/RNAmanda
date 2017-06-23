import ApiService from './api';
import OauthStorage from '../storages/auth.storage';

class OauthService {

    chaira_api = 'http://chaira.udla.edu.co/api/v0.1';
    redirect_uri = 'http://localhost/callback';
    client_id = "800167840216";
    client_secret = "r3wd4q0x12gl4wowln6759vpl7gejy";

    constructor(){
        this.apiService = new ApiService();  
    }

    getAccessToken(code) {
        return this.apiService.POST('/oauth2/authorize.asmx/token', {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: this.redirect_uri,
            client_id: this.client_id,
            client_secret: this.client_secret,
            state: 'OK'
        }, this.chaira_api);
    }

    async getScope(scope, callback) {
        let context = this;
        return OauthStorage.getAuth().then(data => {
            if (data != null) {
                return context.apiService.POST('/oauth2/resource.asmx/scope', {
                    access_token: data.access_token,
                    scope: scope
                }, context.chaira_api);
            } else {
                console.warn("El usuario no esta logeado");
            	return null;
            }
        });
    }
}

export default (OauthService);
