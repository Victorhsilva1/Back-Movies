/**************************
 * Objetivo: Arquivo responsável por agrupar as rotas de Atores
 * Data: 04/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT 
const bodyParserJson = bodyParser.json();

//Import da controller de ator
const controllerAtor = require('../controller/ator/controller_ator.js');

// Rota para listar todos os atores
router.get('/', cors(), async function (request, response) {
    let ator = await controllerAtor.listarAtores();
    response.status(ator.status_code);
    response.json(ator);
});

// Rota para buscar um ator pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idAtor = request.params.id;
    let ator = await controllerAtor.buscarAtoresId(idAtor);
    response.status(ator.status_code);
    response.json(ator);
});

// Rota para inserir um novo ator
router.post('/', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType);
    response.status(ator.status_code);
    response.json(ator);
});

// Rota para atualizar um ator
router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idAtor = request.params.id;
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType);
    response.status(ator.status_code);
    response.json(ator);
});

// Rota para excluir um ator
router.delete('/:id', cors(), async function (request, response) {
    let idAtor = request.params.id;
    let ator = await controllerAtor.excluirAtor(idAtor);
    response.status(ator.status_code);
    response.json(ator);
});

module.exports = router;