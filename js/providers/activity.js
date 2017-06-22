import Event from './event';

class Activity {
    id;
    nombre;
    periodo;
    tipo;
    tipo_string;
    estado;
    fecha_registro;
    //{id, nombre, estado}
    programa;
    grupos = []; //object group
    eventos = []; //object Event
    miembros = [];

    static parserScheduleToActivity(schedule, user) {
        schedule = JSON.parse(schedule);
        let activitys = [];
        for (var i = 0; i < schedule.length; ++i) {
            let group_id = Activity.isGroup(activitys, schedule[i].CODIGOGRUPO);
            if (group_id == -1) {
                activitys.push(new Activity());
                let j = activitys.length - 1;

                activitys[j].id = schedule[i].CODIGOGRUPO;
                activitys[j].nombre = schedule[i].NOMBREMATERIA;
                activitys[j].eventos.push(Activity.createEvent(schedule[i]));
                activitys[j].tipo = 1;
                activitys[j].grupos.push({ id: parseInt(schedule[i].CODIGOGRUPO), nombre: schedule[i].NOMBREGRUPO })
                activitys[j].miembros.push({ usuario: user.correo.split("@")[0], nombres: user.nombres, activity_rol: ((user.indexOfRol('ESTUDIANTE') != -1)? 2 : 1) });
                activitys[j].programa = { id: null, nombre: "" };
                //activitys[j].docente.push(schedule[i].DOCENTE);
            } else {
                activitys[group_id].eventos.push(Activity.createEvent(schedule[i]));
            }
        }

        return activitys;
    }

    static createEvent(schedule) {
        let event = {};
        let time = schedule.TIEMPO.split(' - ');
        event.dia = schedule.DIA;
        event.nombre = schedule.NOMBREMATERIA.split(" ")[0] + " - " + schedule.DIA;
        event.recurso = schedule.NOMENCLATURA;
        event.hora_inicio = time[0];
        event.hora_final = time[1];
        event.silencio = 0;
        event.tiempo_antes = 15;

        return event;
    }

    static isGroup(array, id) {
        for (var i = 0; i < array.length; ++i) {
            if (array[i].id == id) {
                return i;
            }
        }
        return -1;
    }
}

export default (Activity);
