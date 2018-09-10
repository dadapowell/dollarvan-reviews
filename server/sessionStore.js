'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    uid: {
        type: DataTypes.CHAR,
        unique: true
    },
    token: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true
    },
    origin: {
        type: DataTypes.TEXT
    },
    ttl: {
        type: DataTypes.BIGINT
    },
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT
    }
  }, {});
  Session.associate = function(models) {
      Session.associate = function(models) {
          Session.hasOne(models.Passenger, {
            foreignKey: 'sessionID'
        });
      };
  };
  return Session;
};
