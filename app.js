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
const PORT = process.PORT || 8000

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
const controllerfilme = require('./controller/filme/controller_filme.js')


//EndPoints para a rota de Filme
app.get('/v1/locadora/filme', cors(), async function (request, response) {

    //Chama a função para listar os filmes do BD
    let filme = await controllerfilme.listarFilmes();

    response.status(filme.status_code)
    response.json(filme)
})

app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id


    //Chama a função para listar os filmes do BD
    let filme = await controllerfilme.buscarFilmesId(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

app.post('/v1/locadora/filme', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    // Rece os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Insere ou Encaminha os dados e o contentType para a controller
    let filme = await controllerfilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição (JSON ou XML ou ...) 
    let contentType = request.headers['content-type']

    // Rece os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    //Insere ou Encaminha os dados e o contentType para a controller
    let filme = await controllerfilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {

    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    //Chama a função para deletar o filme do BD
    let filme = await controllerfilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})


// -----------------------------------------------------
//                       GENERO

const controllerGenero = require('./controller/genero/controller_genero.js')


//EndPoints para a rota de Filme
app.get('/v1/locadora/genero', cors(), async function (request, response) {

    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.listarGeneros();

    response.status(genero.status_code)
    response.json(genero)

})

app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {
    //Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.buscarGeneroId(idGenero);

    response.status(genero.status_code)
    response.json(genero)
})

app.post('/v1/locadora/genero', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    // Rece os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType);

    response.status(genero.status_code)
    response.json(genero)
})

app.put('/v1/locadora/genero/:id', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição (JSON ou XML ou ...) 
    let contentType = request.headers['content-type']

    // Rece os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o ID encaminhado via parametro na requisição
    let idGenero= request.params.id

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType);

    response.status(genero.status_code)
    response.json(genero)
})

app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {

    //Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    //Chama a função para deletar o filme do BD
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})


app.listen(PORT, function () {
    console.log('API rodando em http://localhost:8000')
})

