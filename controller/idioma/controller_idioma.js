/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de genero
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
    try {

    } catch (error) {

    }
}

const inserirIdioma = async function (idioma, contentType) {
    try {

    } catch (error) {

    }
}

const validarDadosIdioma = async function (idioma) {
    try {

    } catch (error) {

    }
}

const atualizarIdioma = async function (idioma, id, contentType) {
    try {

    } catch (error) {

    }
}

const excluirIdioma = async function (id) {
    try {

    } catch (error) {

    }
}

module.exports = {
    listarIdiomas,
    buscarIdiomaId,
    inserirIdioma,
    validarDadosIdioma,
    atualizarIdioma,
    excluirIdioma
}