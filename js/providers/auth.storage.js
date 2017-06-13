import { AsyncStorage } from 'react-native';

class Oauth {

	db_id = '@db_auth:';

    async getAuth() {
        try {
            let access_token = await AsyncStorage.getItem(this.db_id + 'access_token');
            let refresh_token = await AsyncStorage.getItem(this.db_id + 'refresh_token');
            if (access_token != null) {
                return { access_token: access_token, refresh_token: refresh_token };
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
}

export default (new Oauth);