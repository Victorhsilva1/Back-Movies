/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de idioma
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

// Import da model do DAO do filme 
const idiomaDAO = require('../../model/DAO/idioma.js')

//Import do arquivo de mensagens 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarIdiomas = async function () {

    try {
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let resultIdiomas = await idiomaDAO.getSelectAllIdioma();

        if (resultIdiomas) {
            if (resultIdiomas.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                    MESSAGES.DEFAULT_HEADER.items.idiomas = resultIdiomas;

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } catch (error) {
            return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}

const buscarIdiomaId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
            let resultIdioma = await idiomaDAO.getSelectByIdIdioma(Number(id));

            if (resultIdioma) {
                if (resultIdioma.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                    MESSAGES.DEFAULT_HEADER.items.idioma = resultIdioma;
                    return MESSAGES.DEFAULT_HEADER; // 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND; // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID Incorreto]';
            return MESSAGES.ERROR_REQUIRED_FIELDS; // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

const inserirIdioma = async function (idioma, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosIdioma(idioma);

            if (!validar) {
                let resultIdioma = await idiomaDAO.setInsertIdioma(idioma);

                if (resultIdioma) {
                    let lastId = await idiomaDAO.getSelectLastId();
                    if (lastId) {
                        idioma.id_idioma = lastId;
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                        MESSAGES.DEFAULT_HEADER.items = idioma;
                        return MESSAGES.DEFAULT_HEADER; // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            } else {
                return validar; // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

const validarDadosIdioma = async function (idioma) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    if (idioma.nome_idioma == '' || idioma.nome_idioma == null || idioma.nome_idioma == undefined || idioma.nome_idioma.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome Incorreto]';
        return MESSAGES.ERROR_REQUIRED_FIELDS; // 400
    } else {
        return false;
    }
}

const atualizarIdioma = async function (idioma, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosIdioma(idioma)

            if (!validar) {
                let validarID = await buscarIdiomaId(id)

                if (validarID.status_code == 200) {
                    idioma.id_idioma = Number(id)

                    let resultIdioma = await idiomaDAO.setUpdateIdioma(idioma);

                    if (resultIdioma) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
                        MESSAGES.DEFAULT_HEADER.items.idioma = idioma;
                        
                        return MESSAGES.DEFAULT_HEADER; // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return validarID; // 400, 404 ou 500
                }
            } else {
                return validar; // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

const excluirIdioma = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await buscarIdiomaId(id)

        if (validarID.status_code == 200) {
            let resultIdioma = await idiomaDAO.setDeleteIdioma(Number(id))

            if (resultIdioma) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID;
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

module.exports = {
    listarIdiomas,
    buscarIdiomaId,
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma
}