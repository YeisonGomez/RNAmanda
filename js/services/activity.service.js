import ApiService from './api';
import Activity from '../providers/activity';
import OauthService from '../services/chaira_api';

class ActivityService {

    oauthService = new OauthService();

    constructor() {
        this.apiService = new ApiService();
    }

    addActivitysAll(activitys, i, resolve_final) {
        if (i == activitys.length) {
            resolve_final({ state: 'OK', description: activitys });
        } else {
            this.apiService.POST('/activity/add', activitys[i])
                .then(data => {
                    if (data && data[0].ESTADO == 'OK') {
                        this.addActivitysAll(activitys, i + 1, resolve_final);
                    }
                });
        }
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
                            this.addActivitysAll(activitys, 0, resolve2);
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
