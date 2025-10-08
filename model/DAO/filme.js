/**************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * Data: 01/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

/*
 * Exemplos de Dependencias/Bibliotecas, para conexão com o Banco de Dados
 *  Banco de Dados Relacionais ---
 *  Sequelize -> Foi utilizado em muitos projetos desde o início do Node.JS <Vuneravel!>
 *  Prisma -> É uma dependência atual que trabalha com Banco de Dados (MySQL, PostgreSQL, SQLServer) (SQL ou ORM)
 *      npm install prisma --save         -> instalar o prisma (Conexão com o Database)
 *      npm install @prisma/client --save -> instlar o cliente do prisma (executar scripts SQL no BD)
 *      npx prisma init                   -> prompt de comando para inicializar o prisma
 * 
 *      npx prisma migrate dev            -> Realiza o sincronismo entre o prisma e o BD (CUIDADO!, neste processo
 *                                           você poderá perder dados reais do BD, pois ele pega e cria tabelas programadas do ORM schema.prisma)
 * 
 *      npx prisma generate               -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente usamos para rodar o projeto em um PC novo
 * 
 *  Knex -> É uma dependência que trabalha com MySQL
 * 
 * Banco de Dados Não Relacionais ---
 *  Mongoose -> É uma dependência para o Mongo DB (Não Relacional)
 */

// Import da dependência do Prisma que permite a execução de script SQL no Banco de Dados
// Trazendo somente o PrismaClient para o import
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient, fazendo uma nova instância
const prisma = new PrismaClient()


//Função que retorna todos os filmes do banco de dados
// async por conta da assincrona, para que espere com Await

// $queryRawUnsafe permite executar um Script SQL de uma variável e que retorna valores do Banco de Dados (SELECT)

// $executeRawUnsafe permtie executar um script SQL de uma variável que NÃO retonra bando de dados(INSERT, UPDATE E DELETE)

// $queryRaw permtie executar um script SQL sem estar em uma variável, e que retorna valores do Banco de Dados (SELECT)
// Faz um tratamento de segurança contra SQL Injection

// $executeRaw permtie executar um script SQL sem estar em um variável, que NÃO retorna bando de dados(INSERT, UPDATE E DELETE)
// Faz um tratamento de segurança contra SQL Injection

const getSelectAllMovies = async function () {
    try {

        //Script SQL
        let sql = `select * from tbl_filme order by id desc`;

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



//Função que retorna pelo ID o filme do banco de dados
//Com argumento ID
const getSelectByIdMovies = async function (id) {

    try {

        //Script SQL
        let sql = `select * from tbl_filme where id=${id}`;

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

//Função que insere um filme novo no banco de dados
const setInsertMovies = async function () {

}

//Função que altera um filme no banco de dados
const setUpdateMovies = async function (id) {

}

//Função que deleta um filme pelo ID no banco de dados
const setDeleteMovies = async function (id) {


}

module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies,
    // setInsertMovies,
    // setUpdateMovies,
    // setDeleteMovies
}