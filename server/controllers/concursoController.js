const Concurso = require("../models").Concurso;
const Orgao = require("../models").Orgao;
const Profissao = require("../models").Profissao;
const Candidato = require("../models").Candidato;
const Sequelize = require("sequelize");
const op = Sequelize.Op;

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
    Candidato.findOne({
      include: [
        {
          model: Profissao,
          as: "profissao",
          attributes: ["id"]
        }
      ],
      attributes: [],
      where: [
        {
          cpf: req.params.cpf
        }
      ]
    }).then(candidato => {
      var vet_profissao = [];

      candidato.profissao.forEach(profissao => {
        vet_profissao.push(profissao.id);
      });
      console.log(vet_profissao);

      Concurso.findAll({
        include: [
          {
            model: Orgao,
            as: "orgao",
            attributes: ["id", "nome"]
          },
          {
            model: Profissao,
            as: "vaga",
            attributes: ["id", "nome"],
            where: {
              id: {
                [op.or]: vet_profissao
              }
            }
          }
        ],
        attributes: ["id", "edital", "codigo"]
      }).then(concurso => res.status(200).send(concurso));
    });
  }
};
