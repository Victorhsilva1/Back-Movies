/**************************
 * Objetivo: Arquivo responsável por agrupar as rotas de Classificação
 * Data: 12/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const bodyParserJson = bodyParser.json();

const controllerClassificacao = require('../controller/classificacao/controller_classificacao.js');

router.get('/', cors(), async function (request, response) {
    let classificacao = await controllerClassificacao.listarClassificacoes();
    response.status(classificacao.status_code);
    response.json(classificacao);
});

router.get('/:id', cors(), async function (request, response) {
    let idClassificacao = request.params.id;
    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao);
    response.status(classificacao.status_code);
    response.json(classificacao);
});

router.post('/', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType);
    response.status(classificacao.status_code);
    response.json(classificacao);
});

router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idClassificacao = request.params.id;
    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType);
    response.status(classificacao.status_code);
    response.json(classificacao);
});

router.delete('/:id', cors(), async function (request, response) {
    let idClassificacao = request.params.id;
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao);
    response.status(classificacao.status_code);
    response.json(classificacao);
});

module.exports = router;
