const User = require('./User');
const Event = require('./Event');
const Venue = require('./Venue');
const Type = require('./Type');
const Rsvp = require('./Rsvp')

User.hasMany(Event, {
  foreignKey: 'user_id',
});

Event.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.hasMany(Rsvp, { 
  foreignKey: 'event_id' 
});

Event.belongsToMany(User, {
  through: Rsvp,
  foreignKey: 'event_id',
});

User.belongsToMany(Event, {
  through: Rsvp,
  foreignKey: 'user_id',
});

Rsvp.belongsTo(User, { 
  foreignKey: 'user_id' 
});

Rsvp.belongsTo(Event, { 
  foreignKey: 'event_id' 
});

Event.belongsTo(Venue, {
  foreignKey: 'venue_id',
});
  

module.exports = { User, Event, Venue, Type, Rsvp };
