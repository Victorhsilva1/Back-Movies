/**************************
 * Objetivo: Arquivo responsável por agrupar as rotas de Idiomas
 * Data: 05/11/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 **************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const bodyParserJson = bodyParser.json();

const controllerIdioma = require('../controller/idioma/controller_idioma.js');

router.get('/', cors(), async function (request, response) {
    let idioma = await controllerIdioma.listarIdiomas();
    response.status(idioma.status_code);
    response.json(idioma);
});

router.get('/:id', cors(), async function (request, response) {
    let idIdioma = request.params.id;
    let idioma = await controllerIdioma.buscarIdiomaId(idIdioma);
    response.status(idioma.status_code);
    response.json(idioma);
});

router.post('/', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType);
    response.status(idioma.status_code);
    response.json(idioma);
});

router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idIdioma = request.params.id;
    let idioma = await controllerIdioma.atualizarIdioma(dadosBody, idIdioma, contentType);
    response.status(idioma.status_code);
    response.json(idioma);
});

router.delete('/:id', cors(), async function (request, response) {
    let idIdioma = request.params.id;
    let idioma = await controllerIdioma.excluirIdioma(idIdioma);
    response.status(idioma.status_code);
    response.json(idioma);
});

module.exports = router;