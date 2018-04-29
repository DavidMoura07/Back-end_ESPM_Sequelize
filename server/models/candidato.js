"use strict";
module.exports = (sequelize, DataTypes) => {
  var Candidato = sequelize.define("Candidato", {
    nome: DataTypes.STRING,
    nasc: DataTypes.DATEONLY,
    cpf: DataTypes.STRING
  });
  Candidato.associate = function(models) {
    Candidato.belongsToMany(models.Profissao, {
      through: "Candidato_Profissao",
      as: "profissao",
      foreignKey: "candidato_id"
    });
  };

  return Candidato;
};
