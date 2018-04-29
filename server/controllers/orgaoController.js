const Orgao = require("../models").Orgao;
const Concurso = require("../models").Concurso;

module.exports = {
  list(req, res) {
    return Orgao.findAll({
      include: [
        {
          model: Concurso,
          as: "Concursos",
          attributes: ["codigo", "edital"]
        }
      ],
      attributes: ["nome"]
    }).then(concurso => res.status(200).send(concurso));
  },
  findOne(req, res) {
    return Orgao.findOne({
      include: [
        {
          model: Concurso,
          as: "concursos",
          attributes: ["codigo", "edital"]
        }
      ],
      where: [
        {
          nome: req.params.nomeOrgao
        }
      ],
      attributes: ["nome"]
    })
      .then(orgao => {
        if (!orgao) {
          return res.status(404).send({
            message: "Orgao nao encontrado"
          });
        }
        return res.status(200).send(orgao);
      })
      .catch(error => res.status(400).send(error));
  }
};
