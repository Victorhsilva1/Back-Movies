/**************************
 * Objetivo: Arquivo responsável por agrupar as rotas de Gêneros
 * Data: 05/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const bodyParserJson = bodyParser.json();

const controllerGenero = require('../controller/genero/controller_genero.js');

router.get('/', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGeneros();
    response.status(genero.status_code);
    response.json(genero);
});

router.get('/:id', cors(), async function (request, response) {
    let idGenero = request.params.id;
    let genero = await controllerGenero.buscarGeneroId(idGenero);
    response.status(genero.status_code);
    response.json(genero);
});

router.post('/', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType);
    response.status(genero.status_code);
    response.json(genero);
});

router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idGenero = request.params.id;
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType);
    response.status(genero.status_code);
    response.json(genero);
});

router.delete('/:id', cors(), async function (request, response) {
    let idGenero = request.params.id;
    let genero = await controllerGenero.excluirGenero(idGenero);
    response.status(genero.status_code);
    response.json(genero);
});

module.exports = router;