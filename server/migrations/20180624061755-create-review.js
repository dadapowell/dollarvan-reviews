'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      passengerID: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
            model: 'Passengers',
            key: 'id'
        }
      },
      vanID: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
            model: 'Vans',
            key: 'id'
        }
      },
      star_rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      short_review: {
        type: Sequelize.STRING
      },
      long_review: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};