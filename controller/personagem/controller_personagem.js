/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de personagem
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

//Import da model do DAO de personagens
const personagemDAO = require('../../model/DAO/personagem.js')

//Import do arquivo de mensagens 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

//
const listarPersonagens = async function () {
    try {
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        let resultpersonagens = await personagemDAO.getSelectAllPersonagem()

        if (resultpersonagens) {
            if (resultpersonagens.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                    MESSAGES.DEFAULT_HEADER.items.personagens = resultpersonagens

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

const buscarPersonagemId = async function (id) {

     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
        try {
            if (!isNaN(id) && id !== '' && id !== null && id > 0) {
                let resultPersonagens = await personagemDAO.getSelectByIdPersonagem(Number(id));
    
                if (resultPersonagens) {
                    if (resultPersonagens.length > 0) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.personagens = resultPersonagens

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_NOT_FOUND // 404
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS // 400
            }
        } catch (error) {
            return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
        }

}

const inserirPersonagem = async function (personagem, contentType) {
let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação do tipo de conteúdo da requisiçaõ obrigatório ser um JSON, em maiusculo como String
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados do personagem
            let validar = await validarDadosPersonagem(personagem)

            if (!validar) {

                //Chama a função para inserir um novo personagem no banco de dados
                let resultPersonagens = await personagemDAO.setInsertPersonagem(personagem)

                if (resultPersonagens) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastId = await personagemDAO.getSelectLastId()
                    if (lastId) {
                        //Adiciona o ID no JSON com os dados do personagem
                        personagem.id_personagem = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message //Item criado com sucesso!
                        MESSAGES.DEFAULT_HEADER.items = personagem

                        return MESSAGES.DEFAULT_HEADER //201 || Item criado com sucesso!
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400 problemas nos atributos
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const atualizarPersonagem = async function (personagem, id, contentType) {
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    
        try {
            if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
                let validar = await validarDadosPersonagem(personagem)
    
                if (!validar) {
                    let validarID = await buscarPersonagemId(id)
    
                    if (validarID.status_code == 200) {
                        personagem.id_personagem = Number(id)
    
                        let resultPersonagens = await personagemDAO.setUpdatePersonagem(personagem);
                
    
                        if (resultPersonagens) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.personagens = personagem
                            
                            return MESSAGES.DEFAULT_HEADER // 200
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

const excluirPersonagem = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        let validarID = await buscarPersonagemId(id)

        if (validarID.status_code == 200) {
            let resultPersonagens = await personagemDAO.setDeletePersonagem(Number(id));

            if (resultPersonagens) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // 404 ou 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    
        }
}


const validarDadosPersonagem = async function (personagem) {
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
        if (personagem.nome_personagem == '' || personagem.nome_personagem == null || personagem.nome_personagem == undefined || personagem.nome_personagem.length > 50) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome Incorreto]';
            return MESSAGES.ERROR_REQUIRED_FIELDS; // 400
        } else {
            return false;
        }
}


module.exports = {
    listarPersonagens,
    buscarPersonagemId,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem,
    validarDadosPersonagem
}
