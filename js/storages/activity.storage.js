import { AsyncStorage } from 'react-native';
import Activity from '../providers/activity';

class UserStorage {

    db_id = '@db_activity:';

    async getActivityAll() {
        try {
            let schedule = JSON.parse(await AsyncStorage.getItem(this.db_id + 'schedule'));
            if (schedule != null) {
                return this.parseActivitys(schedule);
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async setActivity(data) {
        //console.log(data);
        try {
            await AsyncStorage.setItem(this.db_id + 'schedule', data);
            return 'OK';
        } catch (error) {
            return null;
        }
    }

    async parseActivitys(schedule) {
        let activitys = [];
        for (var i = 0; i < schedule.length; ++i) {
            let group_id = this.isGroup(activitys, schedule[i].CODIGOGRUPO);
            if(group_id == -1){
                activitys.push(new Activity());
                let j = activitys.length - 1;
                activitys[j].codigo = schedule[i].CODIGO;
                activitys[j].codigo_grupo = schedule[i].CODIGOGRUPO;
                activitys[j].dia.push(schedule[i].DIA);
                activitys[j].docente.push(schedule[i].DOCENTE);
                activitys[j].espacio_fisico.push(schedule[i].ESPACIOFISICO);
                activitys[j].localidad.push(schedule[i].LOCALIDAD);
                activitys[j].nombre_grupo = schedule[i].NOMBREGRUPO;
                activitys[j].nombre_materia = schedule[i].NOMBREMATERIA;
                activitys[j].nomenclatura.push(schedule[i].NOMENCLATURA);
                activitys[j].tiempo.push(schedule[i].TIEMPO);
                activitys[j].unid_nombre = schedule[i].UNID_NOMBRE;
            } else {
                activitys[group_id].dia.push(schedule[i].DIA);
                activitys[group_id].docente.push(schedule[i].DOCENTE);
                activitys[group_id].espacio_fisico.push(schedule[i].ESPACIOFISICO);
                activitys[group_id].localidad.push(schedule[i].LOCALIDAD);
                activitys[group_id].nomenclatura.push(schedule[i].NOMENCLATURA);
                activitys[group_id].tiempo.push(schedule[i].TIEMPO);
            }
        }
        return activitys;
    }

    isGroup(array, id){
        for (var i = 0; i < array.length; ++i) {
            if(array[i].codigo_grupo == id){
                return i;
            }
        }
        return -1;
    }
}

export default (new UserStorage);
