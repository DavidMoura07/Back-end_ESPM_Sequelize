'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Concurso_Profissao', {
        concursoId: {
            type: Sequelize.INTEGER,
            references: {
                 model: 'Concursos',
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
    return queryInterface.dropTable('Concurso_Profissao');
  }
};