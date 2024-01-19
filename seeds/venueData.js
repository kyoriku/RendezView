// Import the Venue model from the specified path
const { Venue } = require('../models');

// Define an array of event data, each object representing an event with a name, description, date, location, and user ID
const venueData = [
  {
    name: "Saddledome",
    capacity: 19289,
    event_types: [1,2],
    latitude: 51.037434,
    longitude: -114.052261
  },
  {
    name: "Rogers Centre",
    capacity: 49286,
    event_types: [1,2],
    latitude: 43.6417837,
    longitude: -79.3917186
  },
  {
    name: "Adelaide Hall",
    capacity: 475,
    event_types: [1,2],
    latitude: 43.6485609,
    longitude: --79.3889531
  },
]

// Define a function called seedEvents, which uses the bulkCreate method of the Event model to insert multiple events into the database
const seedVenues = () => Venue.bulkCreate(venueData);

// Export the seedEvents function to be used in the database seed script: 'seed.js'
module.exports = seedVenues;
