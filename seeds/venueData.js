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
    event_types: [1,2,3,4,5,6,7],
    latitude: 43.6417837,
    longitude: -79.3917186
  },
  {
    name: "Adelaide Hall",
    capacity: 475,
    event_types: [1,3,4,5,6,7],
    latitude: 43.6485609,
    longitude: -79.3889531

  },
  {
    name: "Liberty Grand",
    capacity: 1000,
    event_types: [3,4,6,7],
    latitude: 43.6309849,
    longitude: -79.4287919
  },
  {
    name: "Hart House",
    capacity: 428,
    event_types: [3,4,5,6,7],
    latitude: 43.6640136,
    longitude: -79.3943321
  },
  {
    name: "Gus Ryder Pool",
    capacity: 216,
    event_types: [5,6,7],
    latitude: 43.6012239,
    longitude: -79.5601671
  },
  {
    name: "Alexandra Park",
    capacity: 275,
    event_types: [1,5,6,7],
    latitude: 43.6642167,
    longitude: -79.5567369
  },
  {
    name: "Trillium Park",
    capacity: 350,
    event_types: [1,5,6,7],
    latitude: 43.6300546,
    longitude: -79.4098057
  },
  {
    name: "Old Mill Toronto Hotel",
    capacity: 240,
    event_types: [3,4,5,6,7],
    latitude: 43.6509487,
    longitude: -79.5322319
  },
  {
    name: "Park Lawn Bubble Rink",
    capacity: 2000,
    event_types: [1,2,3,4,5,6,7],
    latitude: 43.6393737,
    longitude: -79.4953842
  }
]

// Define a function called seedEvents, which uses the bulkCreate method of the Event model to insert multiple events into the database
const seedVenues = () => Venue.bulkCreate(venueData);

// Export the seedEvents function to be used in the database seed script: 'seed.js'
module.exports = seedVenues;
