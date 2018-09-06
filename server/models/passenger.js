'use strict';
module.exports = (sequelize, DataTypes) => {

  var Passenger = sequelize.define('Passenger', {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    fbid: {
        type: DataTypes.STRING,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
  }, {});

  Passenger.associate = function(models) {
    Passenger.hasMany(models.Review, {
        foreignKey: 'passengerID',
        onDelete: 'CASCADE'
    });
  };

  return Passenger;
};
