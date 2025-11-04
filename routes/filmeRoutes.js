/**************************
 * Objetivo: Arquivo responsável por agrupar as rotas de Filmes
 * Data: 05/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const bodyParserJson = bodyParser.json();

const controllerfilme = require('../controller/filme/controller_filme.js');

router.get('/', cors(), async function (request, response) {
    let filme = await controllerfilme.listarFilmes();
    response.status(filme.status_code);
    response.json(filme);
});

router.get('/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerfilme.buscarFilmesId(idFilme);
    response.status(filme.status_code);
    response.json(filme);
});

router.post('/', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let filme = await controllerfilme.inserirFilme(dadosBody, contentType);
    response.status(filme.status_code);
    response.json(filme);
});

router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idFilme = request.params.id;
    let filme = await controllerfilme.atualizarFilme(dadosBody, idFilme, contentType);
    response.status(filme.status_code);
    response.json(filme);
});

router.delete('/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerfilme.excluirFilme(idFilme);
    response.status(filme.status_code);
    response.json(filme);
});

module.exports = router;