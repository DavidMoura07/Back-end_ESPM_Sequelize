const candidatoController = require("../controllers").candidatoController;
const concursoController = require("../controllers").concursoController;
const orgaoController = require("../controllers").orgaoController;

module.exports = app => {
  app.get("/candidato/", candidatoController.list);
  app.get("/candidato/:candidatoId", candidatoController.findById);
  app.get("/concursos/", concursoController.list);
  app.get("/concursos/:codConcurso", concursoController.findByCod);
  app.get("/orgao/", orgaoController.list);
  app.get("/orgao/:nomeOrgao", orgaoController.findOne);
};
