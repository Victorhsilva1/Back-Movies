/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de classificação
 * Data: 12/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

//Import da model do DAO de classificacao
const classificacaoDAO = require('../../model/DAO/classificacao.js')

//Import do arquivo de mensagens 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

//Função para listar todas as classificações
const listarClassificacoes = async function () {
    try {
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let resultClassificacoes = await classificacaoDAO.getSelectAllClassificacoes()

        if (resultClassificacoes) {
            if (resultClassificacoes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                    MESSAGES.DEFAULT_HEADER.items.classificacoes = resultClassificacoes

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

//Função para buscar uma classificação pelo ID
const buscarClassificacaoId = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
            let resultClassificacoes = await classificacaoDAO.getSelectByIdClassificacao(Number(id));

            if (resultClassificacoes) {
                if (resultClassificacoes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.classificacoes = resultClassificacoes

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

//Função para inserir uma nova classificação
const inserirClassificacao = async function (classificacao, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {
                let resultClassificacoes = await classificacaoDAO.setInsertClassificacao(classificacao)

                if (resultClassificacoes) {
                    let lastId = await classificacaoDAO.getSelectLastId()
                    if (lastId) {
                        classificacao.id_classificacao = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = classificacao

                        return MESSAGES.DEFAULT_HEADER //201
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

//Função para atualizar uma classificação existente
const atualizarClassificacao = async function (classificacao, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {
                let validarID = await buscarClassificacaoId(id)

                if (validarID.status_code == 200) {
                    classificacao.id_classificacao = Number(id)

                    let resultClassificacoes = await classificacaoDAO.setUpdateClassificacao(classificacao)

                    if (resultClassificacoes) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.classificacao = classificacao

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //400, 404 ou 500
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

//Função para excluir uma classificação
const excluirClassificacao = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
            let validarID = await buscarClassificacaoId(id)

            if (validarID.status_code == 200) {
                let resultClassificacoes = await classificacaoDAO.setDeleteClassificacao(Number(id));

                if (resultClassificacoes) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarID //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para validar os dados da classificação
const validarDadosClassificacao = async function (classificacao) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (classificacao.nome_classificacao == '' || classificacao.nome_classificacao == null || classificacao.nome_classificacao == undefined || classificacao.nome_classificacao.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome da Classificação Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    } else {
        return false
    }
}

module.exports = {
    listarClassificacoes,
    buscarClassificacaoId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}
