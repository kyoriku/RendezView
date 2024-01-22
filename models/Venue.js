const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Venue extends Model {}

Venue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    event_types: {
      type: DataTypes.JSON, // array of type_ids
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
    },
    longitude: {
      type: DataTypes.DECIMAL(11,8),
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'venue',
  }
);

module.exports = Venue;
