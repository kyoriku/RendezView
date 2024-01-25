// Import the RSVP model from the specified path
const { Rsvp } = require('../models');

// Define an array of RSVP data, each object representing a user RSVPing to an event
const rsvpData = [
  {
    user_id: 1,
    event_id: 1,
  },
  {
    user_id: 2,
    event_id: 2,
  },
  {
    user_id: 2,
    event_id: 3,
  },
  {
    user_id: 3,
    event_id: 4,
  },
  {
    user_id: 3,
    event_id: 5,
  },
  {
    user_id: 1,
    event_id: 6,
  },
  {
    user_id: 2,
    event_id: 7,
  },
  {
    user_id: 3,
    event_id: 8,
  },
  {
    user_id: 1,
    event_id: 9,
  },

];

// Define a function called seedRSVPs, which uses the bulkCreate method of the RSVP model to insert multiple RSVPs into the database
const seedRSVPs = () => Rsvp.bulkCreate(rsvpData);

// Export the seedRSVPs function to be used in the database seed script: 'seed.js'
module.exports = seedRSVPs;
