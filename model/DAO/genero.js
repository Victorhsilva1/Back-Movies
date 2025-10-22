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

//Função que retorna todos os generos do banco de dados
const getSelectAllGenres = async function () {
    try {

        //Script SQL
        let sql = `select * from tbl_genero order by id desc`;

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

const getSelectByIdGenres = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_genero where id=${id}`;

        //Encaminha para o BD o Script SQL
        // quando ele devolve algo usa-se o query

        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        return false;
    }

}

const setInsertGenres = async function (genero) {

    try {
        let sql = `INSERT INTO tbl_genero (
        nome_genero
    )
    VALUES (
        '${genero.nome_genero}'
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

//Função que retorna o ultimo ID gerado no BD
const getSelectLastId = async function () {
    try {
        //Script SQL que retorna o ultimo ID do BD
        let sql = `select id from tbl_genero order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false;

    } catch (error) {
        return false
    }
}

const setUpdateGenres = async function (genero) {

    try {
        let sql = `update tbl_genero set (
        nome_genero = '${genero.nome_genero}'
        where id = ${genero.id}`


        // quando ele devolve algo usa-se o query
        // agora quando nao tem o retorno de valor tem que ser o execute 
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteGenres = async function (id) {
    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllGenres,
    getSelectByIdGenres,
    setInsertGenres,
    getSelectLastId,
    setUpdateGenres,
    setDeleteGenres
}
