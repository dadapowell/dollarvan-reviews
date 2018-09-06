'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    sess: {
        type: DataTypes.JSON
    },
    expire: {
        type: DataTypes.DATE
    },
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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
