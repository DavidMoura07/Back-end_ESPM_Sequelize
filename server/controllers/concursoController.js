const Concurso = require("../models").Concurso;
const Orgao = require("../models").Orgao;
const Profissao = require("../models").Profissao;

module.exports = {
  list(req, res) {
    return Concurso.findAll({
      include: [
        {
          model: Orgao,
          as: "orgao",
          attributes: ["id", "nome"]
        },
        {
          model: Profissao,
          as: "vaga",
          attributes: ["id", "nome"]
        }
      ],
      attributes: ["id", "edital", "codigo"]
    }).then(concurso => res.status(200).send(concurso));
  },
  findByCod(req, res) {
    return Concurso.findOne({
      include: [
        {
          model: Orgao,
          as: "orgao",
          attributes: ["nome"]
        },
        {
          model: Profissao,
          as: "vaga",
          attributes: ["id", "nome"]
        }
      ],
      where: [
        {
          codigo: req.params.codConcurso
        }
      ],
      attributes: ["codigo", "edital"]
    })
      .then(concurso => {
        if (!concurso) {
          return res.status(404).send({
            message: "concurso nao encontrado"
          });
        }
        return res.status(200).send(concurso);
      })
      .catch(error => res.status(400).send(error));
  },
  findByCpf(req, res) {
    var request = require("request");
    var url = "http://localhost:8000/candidatos/cpf/" + req.params.cpf;
    request(url, function(error, response, body) {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
    });
  }
};
