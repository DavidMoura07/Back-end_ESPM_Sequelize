"use strict";
module.exports = (sequelize, DataTypes) => {
  var Concurso_Profissao = sequelize.define(
    "Concurso_Profissao",
    {
      concurso_id: {
        type: DataTypes.INTEGER,
        unique: "concurso_profissao"
      },
      profissao_id: {
        type: DataTypes.INTEGER,
        unique: "concurso_profissao"
      }
    },
    {
      freezeTableName: true
    }
  );
  Concurso_Profissao.associate = function(models) {};
  return Concurso_Profissao;
};
