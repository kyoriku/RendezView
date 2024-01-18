const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vendor extends Model {

}

Vendor.init(
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
    event_types: {
      type: DataTypes.JSON, // array of type_ids
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vendor',
  }
);


module.exports = Vendor;
