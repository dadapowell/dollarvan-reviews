'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    star_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    short_review: {
        type: DataTypes.STRING
    },
    long_review: {
        type: DataTypes.TEXT
    },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
  }, {});
    
  Review.associate = function(models) {
      Review.belongsTo(models.Van, {
          foreignKey: "vanID",
          onDelete: "CASCADE"
      });
      
      Review.belongsTo(models.Passenger, {
          foreignKey: "passengerID",
          onDelete: "CASCADE"
      });
  };
    
  return Review;
    
};