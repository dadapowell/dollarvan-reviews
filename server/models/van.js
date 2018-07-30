'use strict';
module.exports = (sequelize, DataTypes) => {
    
  const Van = sequelize.define('Van', {
    base_lic_num: {
        type: DataTypes.STRING,
        allowNull: false
    },
    affil_base_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driver_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licensee_num: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dollarvan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    dollarvan_id_inuse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    dmv_lic_plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
  }, {});
    
  Van.associate = (models) => {
    Van.hasMany(models.Review, {
        foreignKey: 'vanID',
        onDelete: 'CASCADE'
    });
  };
    
  return Van;
    
};