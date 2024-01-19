// Import the Type model from the specified path
const { Type } = require('../models');

// Define an array of event data, each object representing an event with a name, description, date, location, and user ID
const typeData = [
  {
    name: "Concert"
  },
  {
    name: "Skating"
  },
  {
    name: "Black Tie"
  },
  {
    name: "Bachelor / Bachelorette"
  },
  {
    name: "Clown"
  },
  {
    name: "Birthday Party"
  },
  {
    name: "Divorce Party"
  },
]

// Define a function called seedEvents, which uses the bulkCreate method of the Event model to insert multiple events into the database
const seedTypes = () => Type.bulkCreate(typeData);

// Export the seedEvents function to be used in the database seed script: 'seed.js'
module.exports = seedTypes;
