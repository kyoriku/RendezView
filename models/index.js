const User = require('./User');
const Event = require('./Event');
const Venue = require('./Venue');
const Type = require('./Type');

User.hasMany(Event, {
  foreignKey: 'user_id',
});

Event.belongsTo(User, {
  foreignKey: 'user_id'
});

Type.hasMany(Event, {
  foreignKey: 'type_id',
});

Venue.hasMany(Event, {
  foreignKey: 'venue_id',
});

module.exports = { User, Event, Venue, Type };
