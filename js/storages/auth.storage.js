import { AsyncStorage } from 'react-native';
import Auth from '../providers/auth';

class OauthStorage {

	db_id = '@db_auth:';

    async getAuth() {
        try {
            let auth = new Auth();
            auth.access_token = await AsyncStorage.getItem(this.db_id + 'access_token');
            auth.refresh_token = await AsyncStorage.getItem(this.db_id + 'refresh_token');
            if (auth.access_token != null) {
                return auth;
            } else {
            	return null;
            }
        } catch (error) {
            return null;
        }
    }

    async setAuth(data) {
        try {
            await AsyncStorage.setItem(this.db_id + 'access_token', data.access_token);
            await AsyncStorage.setItem(this.db_id + 'refresh_token', data.refresh_token);
            return 'OK';
        } catch (error) {
            return null;
        }
    }

    async isAuth(){
        try {
            let access_token = await AsyncStorage.getItem(this.db_id + 'access_token');
            return access_token != null;
        } catch (error) {
            return false;
        }
    }

    async clearAll(){
        await AsyncStorage.clear();
    }
}

export default (new OauthStorage);