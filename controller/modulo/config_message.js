/**************************
 * Objetivo: Arquivo responsável pelos padrões de mensagem que o projeto irá realizar, sempre no formato JSON (mensagens de erro e sucesso, etc)
 * Data : 07/10/25
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

//Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()


/************************ MENSAGENS PADRONIZADAS *******************/
const DEFAULT_HEADER = {
    development: 'Victor Hugo Rocha da Silva',
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: data_atual.toString(),
    items: {}
}


/****************************MENSAGENS DE SUCESSO************** */
const SUCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida'
}

const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item criado com sucesso!'
}

/************************MENSAGENS DE ERR0******************** */

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno!',
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno do servidor! (Model)',
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno do servidor! (Controller)',
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição, pois existem campos obrigatórios que devem ser encaminhados ou estão incorretos!'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o tipo de dados enviado no corpo deve ser JSON!'
}



module.exports = {
    DEFAULT_HEADER,
    SUCESS_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE
}   
