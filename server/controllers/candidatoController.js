const Candidato = require("../models").Candidato;
const Profissao = require("../models").Profissao;
const Concurso = require("../models").Concurso;
const Candidato_Profissao = require("../models").Candidato_Profissao;
const Sequelize = require("sequelize");
const op = Sequelize.Op;

module.exports = {
  list(req, res) {
    return Candidato.findAll({
      include: [
        {
          model: Profissao,
          as: "profissao",
          attributes: ["id", "nome"]
        }
      ],
      attributes: ["id", "nome", "nasc", "cpf"]
    }).then(candidatos => res.status(200).send(candidatos));
  },
  findById(req, res) {
    return Candidato.findById(req.params.candidatoId, {
      include: [
        {
          model: Profissao,
          as: "profissao",
          attributes: ["id", "nome"]
        }
      ],
      attributes: ["id", "nome", "nasc", "cpf"]
    })
      .then(candidato => {
        if (!candidato) {
          return res.status(404).send({
            message: "candidato nao encontrado"
          });
        }
        return res.status(200).send(candidato);
      })
      .catch(error => res.status(400).send(error));
  },
  findByCPF(req, res) {
    return Candidato.findOne({
      include: [
        {
          model: Profissao,
          as: "profissao",
          attributes: ["id", "nome"]
        }
      ],
      attributes: ["id", "nome", "nasc", "cpf"],
      where: [
        {
          cpf: req.params.cpf
        }
      ]
    })
      .then(candidato => {
        if (!candidato) {
          return res.status(404).send({
            message: "candidato nao encontrado"
          });
        }
        return res.status(200).send(candidato);
      })
      .catch(error => res.status(400).send(error));
  },
  findByCode(req, res) {
    Concurso.findOne({
      include: [
        {
          model: Profissao,
          as: "vaga",
          attributes: ["id"]
        }
      ],
      where: [
        {
          codigo: req.params.cod
        }
      ],
      attributes: []
    })
      .then(concurso => {
        if (!concurso) {
          return res.status(404).send({
            message: "concurso nao encontrado"
          });
        }
        var vet_vagas = [];

        concurso.vaga.forEach(vaga => {
          vet_vagas.push(vaga.id);
        });
        console.log(vet_vagas);

        Candidato.findAll({
          include: [
            {
              model: Profissao,
              as: "profissao",
              attributes: ["nome"],
              where: {
                id: {
                  [op.or]: vet_vagas
                }
              }
            }
          ],
          attributes: ["nome", "nasc", "cpf"]
        }).then(candidatos => res.status(200).send(candidatos));
      })
      .catch(error => res.status(400).send(error));
  }
};
