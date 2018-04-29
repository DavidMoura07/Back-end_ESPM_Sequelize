"use strict";
module.exports = (sequelize, DataTypes) => {
  var Candidato_Profissao = sequelize.define(
    "Candidato_Profissao",
    {
      /*id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },*/
      candidato_id: {
        type: DataTypes.INTEGER,
        unique: "candidato_profissao"
      },
      profissao_id: {
        type: DataTypes.INTEGER,
        unique: "candidato_profissao"
      }
    },
    {
      freezeTableName: true
    }
  );
  Candidato_Profissao.associate = function(models) {};
  return Candidato_Profissao;
};
