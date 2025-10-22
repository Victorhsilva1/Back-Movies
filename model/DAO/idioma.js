/**************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao genero
 * Data: 01/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/


// Import da dependência do Prisma que permite a execução de script SQL no Banco de Dados
// Trazendo somente o PrismaClient para o import
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient, fazendo uma nova instância
const prisma = new PrismaClient()

const getSelectAllIdioma = async function () {

}

const getSelectByIdIdioma = async function (id) {

}

const setInsertIdioma = async function (Idioma) {

} 

const getSelectLastId = async function () {

}

const setUpdateIdioma = async function (Idioma) {

}

const setDeleteIdioma = async function (id) {

}

module.exports = {
    getSelectAllIdioma,
    getSelectByIdIdioma,
    setInsertIdioma,
    getSelectLastId,
    setUpdateIdioma,
    setDeleteIdioma
}