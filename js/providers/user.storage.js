import { AsyncStorage } from 'react-native';

class User {

    db_id = '@db_user:';

    async getUser() {
        try {
            let nombres = await AsyncStorage.getItem(this.db_id + 'NOMBRES');
            if (nombres != null) {
                let user = {
                    nombres: nombres,
                    apellidos: await AsyncStorage.getItem(this.db_id + 'APELLIDOS'),
                    genero: await AsyncStorage.getItem(this.db_id + 'GENERO'),
                    RH: await AsyncStorage.getItem(this.db_id + 'RH'),
                    correo: await AsyncStorage.getItem(this.db_id + 'CORREO'),
                    rol: await AsyncStorage.getItem(this.db_id + 'ROL'),
                    departamento: await AsyncStorage.getItem(this.db_id + 'DEPARTAMENTO'),
                    municipio: await AsyncStorage.getItem(this.db_id + 'MUNICIPIO'),
                    estado: await AsyncStorage.getItem(this.db_id + 'ESTADO'),
                    foto: await AsyncStorage.getItem(this.db_id + 'FOTO')
                };
                return user;
            } else {
            	return null;
            }
        } catch (error) {
            return null;
        }
    }

    async setUser(data) {
        //console.log(data);
        let data_clear = JSON.parse(data);
        data = JSON.parse(data)[0];

        for (var i = 1; i < data_clear.length; ++i) {
            data.ROL += "," + data_clear[i].ROL;
        }

        try {
            await AsyncStorage.setItem(this.db_id + 'NOMBRES', data.NOMBRES);
            await AsyncStorage.setItem(this.db_id + 'APELLIDOS', data.APELLIDOS);
            await AsyncStorage.setItem(this.db_id + 'GENERO', data.GENERO);
            await AsyncStorage.setItem(this.db_id + 'RH', data.RH);
            await AsyncStorage.setItem(this.db_id + 'CORREO', data.CORREO);
            await AsyncStorage.setItem(this.db_id + 'ROL', data.ROL);
            await AsyncStorage.setItem(this.db_id + 'DEPARTAMENTO', data.DEPARTAMENTO);
            await AsyncStorage.setItem(this.db_id + 'MUNICIPIO', data.MUNICIPIO);
            await AsyncStorage.setItem(this.db_id + 'ESTADO', data.ESTADO);
            await AsyncStorage.setItem(this.db_id + 'FOTO', data.FOTO);
            return 'OK';
        } catch (error) {
            return null;
        }
    }
}

export default (new User);
