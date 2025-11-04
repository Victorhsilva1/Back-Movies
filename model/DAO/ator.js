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

}

const setInsertAtores = async function (ator) {

}

const setUpdateAtores = async function (ator) {

}

const setDeleteAtores = async function (id) {

}

const getSelectLastId = async function () {

}

module.exports = {
    getSelectAllAtores,
    getSelectByIdAtores,
    setInsertAtores,
    setUpdateAtores,
    setDeleteAtores,
    getSelectLastId
}