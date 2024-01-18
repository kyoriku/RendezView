const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Owner = require('./Owner');
const Type = require('./Type');

class Event extends Model {

}

Event.init(
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
    attendees: {
      type: DataTypes.JSON,
    }    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

Event.belongsTo(Owner, { foreignKey: 'owner_id' });
Event.belongsTo(Type, { foreignKey: 'type_id' });

module.exports = Event;
