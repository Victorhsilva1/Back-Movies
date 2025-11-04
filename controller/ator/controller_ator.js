/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const atorDAO = require('../../model/DAO/ator.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarAtores = async function () { 
    try {
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let resultAtores = await atorDAO.getSelectAllAtores()

        if (resultAtores) {
            if (resultAtores.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.atores = resultAtores;

                return MESSAGES.DEFAULT_HEADER //

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

const buscarAtoresId = async function (id) {

}

const inserirAtor = async function (ator, contentType) {

}

const atualizarAtor = async function (ator, id, contentType) {

}

const excluirAtor = async function (id) {

}

const validarDadosAtor = async function (ator) {

}


module.exports = {
    listarAtores,
    buscarAtoresId,
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    validarDadosAtor
}