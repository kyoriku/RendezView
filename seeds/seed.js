// Import the Sequelize instance created in the '../config/connection' file
const sequelize = require('../config/connection');

// Import JSON data containing sample user and event information
const seedUsers = require('./userData');
const seedEvents = require('./eventData');
const seedVenues = require('./venueData');
const seedTypes = require('./typeData');
const seedRSVPs = require('./rsvpData');

// Define an asynchronous function named 'seedDatabase' to populate the database with sample data
const seedDatabase = async () => {
  // Synchronize the Sequelize models with the database and force the creation of tables by setting { force: true }
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed the database with users using the seedUsers function and log a message indicating completion
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  // Seed the database with venues using the seedVenues function and log a message indicating completion
  await seedVenues();
  console.log('\n----- VENUES SEEDED -----\n');

  // Seed the database with events using the seedEvents function and log a message indicating completion
  await seedEvents();
  console.log('\n----- EVENTS SEEDED -----\n');

  // Seed the database with RSVPs using the seedRSVPs function and log a message indicating completion
  await seedRSVPs();
  console.log('\n----- RSVPS SEEDED -----\n');

  // Seed the database with types using the seedTypes function and log a message indicating completion
  await seedTypes();
  console.log('\n----- TYPES SEEDED -----\n');

  // Exit the process with a code of 0 (indicating successful execution)
  process.exit(0);
};

// Invoke the 'seedDatabase' function to start the database seeding process
seedDatabase();
