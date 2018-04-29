"use strict";
module.exports = (sequelize, DataTypes) => {
  var Concurso = sequelize.define(
    "Concurso",
    {
      edital: DataTypes.STRING,
      codigo: DataTypes.STRING
    },
    {}
  );
  Concurso.associate = models => {
    Concurso.belongsTo(models.Orgao, {
      foreignKey: "orgao_id",
      as: "orgao",
      onDelete: "CASCADE"
    });
    Concurso.belongsToMany(models.Profissao, {
      through: "Concurso_Profissao",
      as: "vaga",
      foreignKey: "concurso_id"
    });
  };
  return Concurso;
};
