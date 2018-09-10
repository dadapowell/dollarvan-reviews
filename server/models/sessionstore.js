'use strict';
module.exports = (sequelize, DataTypes) => {
  const sessionStore = sequelize.define('SessionStore', {
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
  sessionStore.associate = function(models) {
    // associations can be defined here
  };
  return sessionStore;
};
