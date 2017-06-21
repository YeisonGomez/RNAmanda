import ApiService from './api';
import OauthStorage from '../storages/auth.storage';

class UserService {

    constructor(context){
        this.apiService = new ApiService(context);  
    }

    login(user) {
        return this.apiService.POST('/user/login', {
            usuario: user.usuario,
            nombres: user.nombres,
            apellidos: user.apellidos,
            genero: user.genero,
            estado: user.estado,
            foto: user.foto,
            programa: user.programa,
            rol: user.rol
        });
    }
}

export default (UserService);
