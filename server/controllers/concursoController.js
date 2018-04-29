const Concurso = require("../models").Concurso;
const Orgao = require("../models").Orgao;

module.exports = {
  list(req, res) {
    return Concurso.findAll({
      include: [
        {
          model: Orgao,
          as: "orgao",
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
  }
};
