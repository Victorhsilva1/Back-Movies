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
}

const buscarPersonagemId = async function (id) {
}

const inserirPersonagem = async function (personagem, contentType) {   
}

const atualizarPersonagem = async function (personagem, id, contentType) {
}

const excluirPersonagem = async function (id) {
}

const validarDadosPersonagem = async function (personagem) {
}


module.exports = {
    listarPersonagens,
    buscarPersonagemId,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem,
    validarDadosPersonagem
}
