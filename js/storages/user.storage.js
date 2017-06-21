import { AsyncStorage } from 'react-native';
import User from '../providers/user';

class UserStorage {

    db_id = '@db_user:';

    async getUser() {
        try {
            let user = new User();
            user.nombres = await AsyncStorage.getItem(this.db_id + 'NOMBRES');
            if (user.nombres != null) {
                
                user.apellidos = await AsyncStorage.getItem(this.db_id + 'APELLIDOS');
                user.genero = await AsyncStorage.getItem(this.db_id + 'GENERO');
                user.RH = await AsyncStorage.getItem(this.db_id + 'RH');
                user.correo = await AsyncStorage.getItem(this.db_id + 'CORREO');
                user.rol = await AsyncStorage.getItem(this.db_id + 'ROL');
                user.departamento = await AsyncStorage.getItem(this.db_id + 'DEPARTAMENTO');
                user.municipio = await AsyncStorage.getItem(this.db_id + 'MUNICIPIO');
                user.estado =  await AsyncStorage.getItem(this.db_id + 'ESTADO');
                user.foto = await AsyncStorage.getItem(this.db_id + 'FOTO');
                user.programa = await AsyncStorage.getItem(this.db_id + 'PROGRAMA');

                user.programa = JSON.parse(user.programa);
                user.rol = JSON.parse(user.rol);
                return user;
            } else {
            	return null;
            }
        } catch (error) {
            return null;
        }
    }

    async setUser(data) {
        try {
            await AsyncStorage.setItem(this.db_id + 'NOMBRES', data.nombres);
            await AsyncStorage.setItem(this.db_id + 'APELLIDOS', data.apellidos);
            await AsyncStorage.setItem(this.db_id + 'GENERO', data.genero);
            await AsyncStorage.setItem(this.db_id + 'RH', data.RH);
            await AsyncStorage.setItem(this.db_id + 'CORREO', data.correo);
            await AsyncStorage.setItem(this.db_id + 'ROL', JSON.stringify(data.rol));
            await AsyncStorage.setItem(this.db_id + 'DEPARTAMENTO', data.departamento);
            await AsyncStorage.setItem(this.db_id + 'MUNICIPIO', data.municipio);
            await AsyncStorage.setItem(this.db_id + 'ESTADO', data.estado);
            await AsyncStorage.setItem(this.db_id + 'FOTO', data.foto);
            await AsyncStorage.setItem(this.db_id + 'PROGRAMA', JSON.stringify(data.programa));
            return 'OK';
        } catch (error) {
            return null;
        }
    }

    async setAttributeUser(attribute, data){
        try {
            await AsyncStorage.setItem(this.db_id + attribute, data);
            return 'OK';
        } catch (error) {
            return null;
        }
    }
}

export default (new UserStorage);
