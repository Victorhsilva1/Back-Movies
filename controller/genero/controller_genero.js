/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de genero
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

// Import da model do DAO do filme 
const generoDAO = require('../../model/DAO/genero.js')

//Import do arquivo de mensagens 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarGeneros = async function () {

    try {
        // Criando um objeto novo para as mensagens
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        // chama a funão do DAO para retornar a lista de filmes do BD
        let resultGeneros = await generoDAO.getSelectAllGenres()

        // é o retorno do DAO
        if (resultGeneros) {
            if (resultGeneros.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                    MESSAGES.DEFAULT_HEADER.items.generos = resultGeneros

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

//Retorna um genero filtrando pelo id
const buscarGeneroId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Criando um objeto novo para as mensagens

        //se for ao contrario do falso, entra e continua o fluxo
        //Validação da chegada do ID
        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
            let resultGeneros = await generoDAO.getSelectByIdGenres(Number(id));

            if (resultGeneros) {
                if (resultGeneros.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                        MESSAGES.DEFAULT_HEADER.items.generos = resultGeneros

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

//Insere um genero
//Função inserir genero, async pois ela espera uma resposta
//contentType é o tipo de  conteúdo 
const inserirGenero = async function (genero, contentType) {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da contentType ou seja ->
        //Validação do tipo de conteúdo da requisiçaõ obrigatório ser um JSON, em maiusculo como String
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados do genero
            //await pois ela aguarda uma resposta
            let validar = await validarDadosGenero(genero)

            //!validar inverte o valor booleano 
            if (!validar) {
                //Chama a função para inserir um novo filme no banco de dados
                let resultGeneros = await generoDAO.setInsertGenres(genero)

                if (resultGeneros) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastId = await generoDAO.getSelectLastId()
                    if (lastId) {
                        //Adiciona o ID no JSON com os dados do filme
                        genero.id = lastId

                        //Mensagens dos itens status, status code, a resposta em messagens e os itens adicionados
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message //Item criado com sucesso!

                        MESSAGES.DEFAULT_HEADER.items = genero


                        return MESSAGES.DEFAULT_HEADER //201 || Item criado com sucesso!
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                //retorna o validar com o
                return validar //400 problemas nos atributos
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosGenero = async function (genero) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if (
        genero.nome_genero == '' || genero.nome_genero.length > 45) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    } else {
        return false
    }
}

//Atualiza um genero buscando pelo id
const atualizarGenero = async function (genero, id, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosGenero(genero)

            if (!validar) {
                let validarID = await buscarGeneroId(id)

                if (validarID.status_code == 200) {
                    genero.id = Number(id)

                    let resultGeneros = await generoDAO.setUpdateGenres(genero)

                    if (resultGeneros) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message //Item criado com sucesso!
                        MESSAGES.DEFAULT_HEADER.items.generos = genero


                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID // a função buscarFilmeID poderá retornar (400, 404 ou 500)
                }

            } else {
                return validar //400 referente a validação dos dados = problemas nos atributos
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirGenero = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarGeneroId(id)

        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
            let resultGeneros = await generoDAO.setDeleteGenres(Number(id))
            if (resultGeneros) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
        else {
            return validarID //
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero,
    validarDadosGenero,
    atualizarGenero,
    excluirGenero
}