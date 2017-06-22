import ApiService from './api';

class ActivityService {

    constructor(context) {
        this.apiService = new ApiService(context);
    }

    addActivitysAll(activitys, i) {
        return new Promise(resolve => {
            if (i == activitys.length) {
                resolve({ state: 'OK' });
            } else {
                console.log("REGISTRANDO...");
                console.log(activitys[i]);
                this.apiService.POST('/activity/add', activitys[i])
                    .then(data => {
                        console.log(data);
                        if (data && data[0].ESTADO == 'OK') {
                            this.addActivitysAll(activitys, i + 1);
                        }
                    });
            }
        });
    }

    getActivitys() {
        return this.apiService.GET('/activity/user/get-activitys');
    }

    getActivitysChaira(user, oauthService) {
        return new Promise(resolve => {
            if (user.indexOfRol("ESTUDIANTE") != -1) {
                oauthService.getScope('schedule')
                    .then((data) => {
                        if (false && data.state == 'OK') {
                            let activitys = Activity.parserScheduleToActivity(data.description, user);
                            this.addActivitysAll(activitys, 0)
                                .then(data => {
                                    console.log(data);
                                });
                        } else {
                            //Validar si no tiene materias
                            console.log(data);
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
