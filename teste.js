const request = require("request");
findByCpf(req, res) {
    var url = "http://localhost:8000/candidatos/cpf/" + req.params.cpf;
    request(url, function(error, response, body) {
      var candidato = JSON.parse(body);
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
//}); // linha 104