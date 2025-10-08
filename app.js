/**************************
 * Objetivo: Arquivo responsável pelas requisiçoes da APIda locadora de filmes
 * Data: 07/10/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express') // Responsável pela API
const cors = require('cors') // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser') // Responsável por gerenciar a chegada dos dados da API com o front



// Retorna a porta do servidor atual ou colocamos uma porta local 
const PORT = process.PORT || 8080

// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões 
app.use((request, response, next)=>{
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


app.listen(PORT, function(){
    console.log('API rodando em http://localhost:8080')
  })