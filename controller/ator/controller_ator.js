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
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
            let resultAtores = await atorDAO.getSelectByIdAtores(Number(id));

            if (resultAtores) {
                if (resultAtores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                        MESSAGES.DEFAULT_HEADER.items.atores = resultAtores;

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const inserirAtor = async function (ator, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosAtor(ator)

            if (!validar) {
                let resultAtores = await atorDAO.setInsertAtores(ator)

                if (resultAtores) {
                    let lastId = await atorDAO.getSelectLastId()
                    if (lastId) {
                        ator.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = ator

                        return MESSAGES.DEFAULT_HEADER //
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


const atualizarAtor = async function (ator, id, contentType) {

}

const excluirAtor = async function (id) {

}

const validarDadosAtor = async function (ator) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome do Ator Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    } else if (ator.biografia == '' || ator.biografia == null || ator.biografia == undefined || ator.biografia.length > 65000) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Biografia do Ator Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    } else if (ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento == undefined || ator.data_nascimento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de Nascimento do Ator Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    } else if (ator.nacionalidade == '' || ator.nacionalidade == null || ator.nacionalidade == undefined || ator.nacionalidade.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nacionalidade do Ator Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    } else {
        return false
    }

}


module.exports = {
    listarAtores,
    buscarAtoresId,
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    validarDadosAtor
}