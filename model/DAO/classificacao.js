/**************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a classificação
 * Data: 12/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

// Import da dependência do Prisma que permite a execução de script SQL no Banco de Dados
// Trazendo somente o PrismaClient para o import
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient, fazendo uma nova instância
const prisma = new PrismaClient()

const getSelectAllClassificacoes = async function () {
    try {

        //Script SQL
        let sql = `select * from tbl_classificacao order by id_classificacao desc`;

        //Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        return false;
    }
}

const getSelectByIdClassificacao = async function (id) {

    try {
        let sql = `select * from tbl_classificacao where id_classificacao = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        if (Array.isArray(result)) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }

}

const setInsertClassificacao = async function (classificacao) {
    try {
        let sql = `INSERT INTO tbl_classificacao (
        nome_classificacao
    )
    VALUES (
        '${classificacao.nome_classificacao}'
        )`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
        // quando ele devolve algo usa-se o query
    } catch (error) {
        return false
    }
}

const setUpdateClassificacao = async function (classificacao) {
    try {
        let sql = `UPDATE tbl_classificacao SET
            nome_classificacao = '${classificacao.nome_classificacao}'
        WHERE id_classificacao = ${classificacao.id_classificacao}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteClassificacao = async function (id) {
    try {
        let sql = `DELETE FROM tbl_classificacao WHERE id_classificacao = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastId = async function () {
    try {
        let sql = `select id_classificacao from tbl_classificacao order by id_classificacao desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id_classificacao)
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllClassificacoes,
    getSelectByIdClassificacao,
    setInsertClassificacao,
    setUpdateClassificacao,
    setDeleteClassificacao,
    getSelectLastId
}
