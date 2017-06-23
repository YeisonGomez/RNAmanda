import ApiService from './api';
import Activity from '../providers/activity';
import OauthService from '../services/chaira_api';

class ActivityService {

	oauthService = new OauthService();

    constructor() {
        this.apiService = new ApiService();
    }

    addActivitysAll(activitys, i, resolve_final) {
        return new Promise(resolve => {
            if (i == activitys.length) {
                resolve_final({ state: 'OK' });
            } else {
                console.log("REGISTRANDO...");
                this.apiService.POST('/activity/add', activitys[i])
                    .then(data => {
                    	console.log(data);
                        if (data && data[0].ESTADO == 'OK') {
                            this.addActivitysAll(activitys, i + 1, resolve);
                        }
                    });
            }
        });
    }

    getActivitys() {
        return this.apiService.GET('/activity/user/get-activitys');
    }

    getActivitysChaira(user) {
        return new Promise(resolve2 => {
            if (user.indexOfRol("ESTUDIANTE") != -1) {
                this.oauthService.getScope('schedule')
                    .then((data) => {
                        if (data.state == 'OK') {
                            let activitys = Activity.parserScheduleToActivity(data.description, user);
                            this.addActivitysAll(activitys, 0)
                                .then(data => {
                                	console.log("hola");
                                    resolve2({ state: 'OK' });
                                });
                        } else {
                            resolve2({ state: 'ERROR', description: 'El usuario no tiene materias actualmente' });
                        }
                    });
            }
            if (user.indexOfRol("FUNCIONARIO") != -1) {
                console.log("docente");
            }
        });
    }
}

export default (ActivityService);
