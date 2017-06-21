import OauthService from '../services/chaira_api';

import UserStorage from '../storages/user.storage';

class User {
    usuario;
    nombres;
    apellidos;
    genero;
    RH;
    correo;
    departamento;
    municipio;
    estado;
    foto;
    //{id, nombre, academic: {creditos, facultad, promedio, situacion, ubicacion_semestral}}
    programa = [];
    //{nombre}
    rol = [];

    indexOfRol(rol) {
        for (var i = 0; i < this.rol.length; ++i) {
            if (this.rol[i].nombre == rol) {
                return i;
            }
        }
        return -1;
    }

    getProgram(context) {
        return new Promise(resolve => {
            if (this.indexOfRol("ESTUDIANTE") != -1) {
                let oauthService = new OauthService(context);
                oauthService.getScope('student_academic_information')
                    .then(data => {
                        if (data && data.state != 'error') {
                            let academic = JSON.parse(data.description);
                            for (var i = 0; i < academic.length; ++i) {
                                this.programa.push({
                                    id: academic[i].CODIGOPROGRAMA,
                                    nombre: academic[i].PROGRAMA,
                                    academic: {
                                        creditos: academic[i].CREDITOS,
                                        facultad: academic[i].FACULTAD,
                                        promedio: academic[i].PROMEDIO,
                                        situacion: academic[i].SITUACION,
                                        ubicacion_semestral: academic[i].UBICACIONSEMESTRAL
                                    }
                                });
                            }
                            resolve(academic);
                        } else {
                            console.log(data);
                            resolve({ state: "ERROR" });
                        }
                    });
            } else {
                resolve({ state: 'ERROR', description: "Es un docente" });
            }
        });
    }

    parseUserScope(data) {
        let data_clear = JSON.parse(data);
        data = JSON.parse(data)[0];

        data.rol = [];
        for (var i = 0; i < data_clear.length; ++i) {
            data.rol.push({ nombre: data_clear[i].ROL });
        }

        this.usuario = data.CORREO.split("@")[0];
        this.nombres = data.NOMBRES;
        this.apellidos = data.APELLIDOS;
        this.genero = data.GENERO;
        this.RH = data.RH;
        this.correo = data.CORREO;
        this.rol = data.rol;
        this.departamento = data.DEPARTAMENTO;
        this.municipio = data.MUNICIPIO;
        this.estado = data.ESTADO;
        this.foto = data.FOTO;
        return this;
    }
}

export default (User);
