/**************************
 * Objetivo: Arquivo responsável por agrupar as rotas de Personagens
 * Data: 05/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJson = bodyParser.json()

const controllerPersonagem = require('../controller/personagem/controller_personagem.js')

router.get('/', cors(), async function (request, response) {
    let personagem = await controllerPersonagem.listarPersonagens()
    response.status(personagem.status_code)
    response.json(personagem)
});

router.get('/:id', cors(), async function (request, response) {
    let idPersonagem = request.params.id
    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
});

router.post('/', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)
    response.status(personagem.status_code)
    response.json(personagem)
});

router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body
    let idPersonagem = request.params.id
    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)
    response.status(personagem.status_code)
    response.json(personagem)
});

router.delete('/:id', cors(), async function (request, response) {
    let idPersonagem = request.params.id
    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
});

module.exports = router