/**************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao idioma
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
    try {

        //Script SQL
        let sql = `select * from tbl_idioma order by id_idioma desc`;

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

const getSelectByIdIdioma = async function (id) {
    try {
        let sql = `select * from tbl_idioma where id_idioma = ${id}`;
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

const setInsertIdioma = async function (idioma) {
    try {
        let sql = `INSERT INTO tbl_idioma (
        nome_idioma
    )
    VALUES (
        '${idioma.nome_idioma}'
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

const getSelectLastId = async function () {
    try {
        //Script SQL que retorna o ultimo ID do BD
        let sql = `select id_idioma as id from tbl_idioma order by id_idioma desc limit 1` // Retorna id_idioma como 'id'

        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false;

    } catch (error) {
        return false

    }
}

const setUpdateIdioma = async function (idioma) {
    try {
        let sql = `update tbl_idioma set
         nome_idioma = '${idioma.nome_idioma}'
          where id_idioma = ${idioma.id_idioma}`


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

const setDeleteIdioma = async function (id) {
    try {
        let sql = `delete from tbl_idioma where id_idioma = ${id}`; 

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

module.exports = {
    setDeleteIdioma,
    setUpdateIdioma,
    getSelectLastId,
    setInsertIdioma,
    getSelectByIdIdioma,
    getSelectAllIdioma
}