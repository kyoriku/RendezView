// Import the Sequelize instance created in the '../config/connection' file
const sequelize = require('../config/connection');

// Destructure the User and Event models from the '../models' module
const { User, Event } = require('../models');

// Import JSON data containing sample user and event information
const userData = require('./userData.json');
const eventData = require('./eventData.json');

// Define an asynchronous function named 'seedDatabase' to populate the database with sample data
const seedDatabase = async () => {
  // Synchronize the database and force it to drop and recreate tables (force: true)
  await sequelize.sync({ force: true });

  // Use the User model to bulk create users with data from 'userData.json'
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // Apply Sequelize hooks defined in the User model
    returning: true,       // Return the created user instances
  });

  // Iterate through each event in 'eventData' and create events using the Event model
  for (const event of eventData) {
    // Create an event with properties from 'eventData' and assign a random user ID from the created users
    await Event.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Exit the process after seeding the database
  process.exit(0);
};

// Invoke the 'seedDatabase' function to start the database seeding process
seedDatabase();
