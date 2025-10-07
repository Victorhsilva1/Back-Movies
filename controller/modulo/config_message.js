/**************************
 * Objetivo: Arquivo responsável pelos padrões de mensagem que o projeto irá realizar, sempre no formato JSON (mensagens de erro e sucesso, etc)
 * Data : 07/10/25
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

//Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()


/************************ MENSAGENS PADRONIZADAS *******************/
const MESSAGE_HEADER = {
    development: 'Victor Hugo Rocha da Silva',
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: data_atual.getTimezoneOffset(),
    items: []
}


/****************************MENSAGENS DE SUCESSO************** */
const MESSAGE_REQUEST_SUCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida',
    items: []

}


/************************MENSAGENS DE ERR0******************** */



module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCESS
}   
