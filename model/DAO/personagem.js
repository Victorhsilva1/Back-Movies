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
    try {

        //Script SQL
        let sql = `select * from tbl_personagem order by id_personagem desc`;

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

const getSelectByIdPersonagem = async function (id) {

    try {
        let sql = `select * from tbl_personagem where id_personagem = ${id}`;
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

const setInsertPersonagem = async function (personagem) {
    try {
        let sql = `INSERT INTO tbl_personagem (
        nome_personagem
    )
    VALUES (
        '${personagem.nome_personagem}'
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
        let sql = `select id_personagem as id from tbl_personagem order by id_personagem desc limit 1` // Retorna id_personagem como 'id'

        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false;

    } catch (error) {
        return false

    }
}

const setUpdatePersonagem = async function (personagem) {
    try {
        let sql = `update tbl_personagem set
         nome_personagem = '${personagem.nome_personagem}'
          where id_personagem = ${personagem.id_personagem}`


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

const setDeletePersonagem = async function (id) {
    try {
        let sql = `delete from tbl_personagem where id_personagem = ${id}`; 

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
    getSelectAllPersonagem,
    getSelectByIdPersonagem,
    setInsertPersonagem,
    getSelectLastId,
    setUpdatePersonagem,
    setDeletePersonagem
}