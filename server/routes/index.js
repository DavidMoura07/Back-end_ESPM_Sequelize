const candidatoController = require("../controllers").candidatoController;
const concursoController = require("../controllers").concursoController;
const orgaoController = require("../controllers").orgaoController;

module.exports = app => {
  app.get("/candidatos/", candidatoController.list);
  app.get("/candidatos/id/:candidatoId", candidatoController.findById);
  app.get("/candidatos/cpf/:cpf", candidatoController.findByCPF);
  app.get("/concursos/", concursoController.list);
  app.get("/concursos/:codConcurso", concursoController.findByCod);
  app.get("/concursos/cpf/:cpf", concursoController.findByCpf);
  app.get("/orgaos/", orgaoController.list);
  app.get("/orgaos/:nomeOrgao", orgaoController.findOne);
};
