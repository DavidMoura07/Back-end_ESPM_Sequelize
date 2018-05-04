'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Candidato_Profissao', {
        candidatoId: {
            type: Sequelize.INTEGER,
            references: {
                 model: 'Candidatos',
                 key: 'id'
            }
         },
         profissaoId: {
            type: Sequelize.INTEGER,
            references: {
                 model: 'Profissaos',
                 key: 'id'
            }
         },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Candidato_Profissao');
  }
};