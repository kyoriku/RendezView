const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // venue_id: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'venue',
    //     key: 'id',
    //   },
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
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

Event.belongsTo(User, { foreignKey: 'user_id' });
Event.belongsTo(Type, { foreignKey: 'type_id' });

module.exports = Event;
