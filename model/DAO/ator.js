/**************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao ator
 * Data: 01/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllAtores = async function () {
    try {

        //Script SQL
        let sql = `select * from tbl_ator order by id desc`;

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

const getSelectByIdAtores = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_ator where id=${id}`;

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

const setInsertAtores = async function (ator) {
    try {
        let sql = `INSERT INTO tbl_ator (
    nome,
    biografia,
    data_nascimento,
    nacionalidade
)
    VALUES (
        '${ator.nome}',
        '${ator.biografia}',
        '${ator.data_nascimento}',
        '${ator.nacionalidade}')`

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

const setUpdateAtores = async function (ator) {
    try {
        let sql = `update tbl_ator set
        nome = '${ator.nome}',
        biografia = '${ator.biografia}',
        data_nascimento = '${ator.data_nascimento}',
        nacionalidade = '${ator.nacionalidade}'
        where id = ${ator.id}`


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

const setDeleteAtores = async function (id) {
    try {
        let sql = `delete from tbl_ator where id = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const getSelectLastId = async function () {
    try {

        //Script SQL que retorna o ultimo ID do BD
        let sql = `select id from tbl_ator order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false;

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllAtores,
    getSelectByIdAtores,
    setInsertAtores,
    setUpdateAtores,
    setDeleteAtores,
    getSelectLastId
}