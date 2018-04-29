"use strict";
module.exports = (sequelize, DataTypes) => {
  var Concurso_Profissao = sequelize.define(
    "Concurso_Profissao",
    {
      nome: DataTypes.STRING
    },
    {}
  );
  Concurso_Profissao.associate = function(models) {
    Concurso_Profissao.belongsTo(models.Concurso, {
      foreignKey: "concursoId",
      onDelete: "CASCADE"
    });
  };
  return Concurso_Profissao;
};
