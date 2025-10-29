/**************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao personagem
 * Data: 01/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/


// Import da dependência do Prisma que permite a execução de script SQL no Banco de Dados
// Trazendo somente o PrismaClient para o import
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient, fazendo uma nova instância
const prisma = new PrismaClient()

const getSelectAllPersonagem = async function () {
}

const getSelectByIdPersonagem = async function (id) {
}

const setInsertPersonagem = async function (personagem) {
}   

const getSelectLastId = async function () {
}

const setUpdatePersonagem = async function (personagem) {
}

const setDeletePersonagem = async function (id) {
}

module.exports = {
    getSelectAllPersonagem,
    getSelectByIdPersonagem,
    setInsertPersonagem,
    getSelectLastId,
    setUpdatePersonagem,
    setDeletePersonagem
}