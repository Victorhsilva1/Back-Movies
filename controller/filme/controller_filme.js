/**************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

// Import da model do DAO do filme 
const filmeDAO = require('../../model/DAO/filme.js')

//Import do arquivo de mensagens 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')


//Retorna uma lista de todos os filmes
const listarFilmes = async function () {

    try {

        // Criando um objeto novo para as mensagens
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        // chama a funão do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies();

        // é o retorno do DAO
        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                // Se ele cair nesta condicional 
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                    MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes;

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
};


//Retorna um filme filtrando pelo id
const buscarFilmesId = async function (id) {

    try {

        //Criando um objeto novo para as mensagens
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


        //se for ao contrario do falso, entra e continua o fluxo
        //Validação da chegada do ID
        if (!isNaN(id)) {
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id));

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status,
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code,
                        MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes;

                        return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um filme
const inserirFilme = async function (filme) {

}

//Atualiza um filme buscando pelo id
const atualizarFilme = async function (filme, id) {

}

//Deleta um filme filtrando pelo id
const excluirFilme = async function (id) {

}

module.exports = {
    listarFilmes,
    buscarFilmesId
    // inserirFilme,
    // atualizarFilme,
    // excluirFilme
}