"use strict";
module.exports = (sequelize, DataTypes) => {
  var Profissao = sequelize.define(
    "Profissao",
    {
      nome: DataTypes.STRING
    },
    {
      //prevent sequelize from pluralizing table names
      freezeTableName: true
    }
  );
  Profissao.associate = function(models) {
    Profissao.belongsToMany(models.Candidato, {
      through: "Candidato_Profissao",
      as: "profissao",
      foreignKey: "profissao_id"
    });
    Profissao.belongsToMany(models.Concurso, {
      through: "Concurso_Profissao",
      as: "vaga",
      foreignKey: "profissao_id"
    });
  };

  return Profissao;
};
