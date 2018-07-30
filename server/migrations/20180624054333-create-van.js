'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      base_lic_num: {
        type: Sequelize.STRING,
        allowNull: false
      },
      affil_base_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      driver_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      licensee_num: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      dollarvan_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
      },
      dollarvan_id_inuse: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      dmv_lic_plate: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('Vans');
  }
};