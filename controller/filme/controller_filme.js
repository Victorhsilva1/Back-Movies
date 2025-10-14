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


    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Criando um objeto novo para as mensagens
        


        //se for ao contrario do falso, entra e continua o fluxo
        //Validação da chegada do ID
        if (!isNaN(id) && id !== '' && id !== null && id > 0) {
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
//contentType é o tipo de  conteúdo 
const inserirFilme = async function (filme, contentType) {


    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação do tipo de conteúdo da requisiçaõ obrigatório ser um JSON, em maiusculo como String
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validações de todas as entradas de dados
        if (
            filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        } else if (
            filme.sinopse == undefined) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        } else if (
             filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de Lançamento Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else if (
            filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else if(
            filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || filme.orcamento.length > 12 || typeof filme.orcamento != 'number'){
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        } else if (
            filme.trailer == undefined || filme.trailer.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        } else if (
            filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa Incorreto]' 
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else{
            //Chama a função para inserir um novo filme no banco de dados
            let resultFilmes = await filmeDAO.setInsertMovies(filme)

            if (resultFilmes) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status 
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code 
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message //Item criado com sucesso!

                return MESSAGES.DEFAULT_HEADER //201 || Item criado com sucesso!
                
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } else {
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}

//Atualiza um filme buscando pelo id
const atualizarFilme = async function (filme, id) {

}

//Deleta um filme filtrando pelo id
const excluirFilme = async function (id) {

}

module.exports = {
    listarFilmes,
    buscarFilmesId,
    inserirFilme
    // atualizarFilme,
    // excluirFilme
}