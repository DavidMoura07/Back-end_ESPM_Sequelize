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
  };
  return Concurso;
};
