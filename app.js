/**************************
 * Objetivo: Arquivo responsável pelas requisiçoes da APIda locadora de filmes
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express') // Responsável pela API
const cors = require('cors') // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser') // Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT 
const bodyParserJson = bodyParser.json()

// Retorna a porta do servidor atual ou colocamos uma porta local 
const PORT = process.env.PORT || 8000

// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões 
app.use((request, response, next) => {
    // Servidor de origem da API
    response.header('Access-Control-Allow-Origin', '*')
    // Verbos permitidos na API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    //Carrega as configurações no cors da API
    // As permissões que estão sendo utilizadas aqui, colocando restrições
    app.use(cors())
    // Next é o proximo, no caso carregar os próximos endPoints
    next()
})

//Import das controllers 
const filmeRouter = require('./routes/filmeRoutes.js');
app.use('/v1/locadora/filme', filmeRouter);

//EndPoints para a rota de Filme

// -----------------------------------------------------
//                       GENERO

const generoRouter = require('./routes/generoRoutes.js');
app.use('/v1/locadora/genero', generoRouter);

// -----------------------------------------------------
//                          IDIOMA 
// ----------------------------------------------------

const idiomaRouter = require('./routes/idiomaRoutes.js');
app.use('/v1/locadora/idioma', idiomaRouter);

// -------------------- PERSONAGEM ---------------------

const personagemRouter = require('./routes/personagemRoutes.js');
app.use('/v1/locadora/personagem', personagemRouter);

// ------------ ATOR ---------

const atorRouter = require('./routes/atorRoutes.js');
app.use('/v1/locadora/ator', atorRouter);

// ------------ CLASSIFICACAO ---------

const classificacaoRouter = require('./routes/classificacaoRoutes.js');
app.use('/v1/locadora/classificacao', classificacaoRouter);


// listen

app.listen(PORT, function () {
    console.log('API rodando em http://localhost:8000')
})
