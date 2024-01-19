// Import the User model from the specified path
const { User } = require('../models');

// Define an array of user data, each object representing a user with a username, email, and password
const userData = [
  {
    username: "Sal",
    email: "sal@hotmail.com",
    password: "password123",
    can_own: 1
  },
  {
    username: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password456",
    can_own: 1
  },
  {
    username: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password789",
    can_own: 1
  }
];

// Define a function called seedUsers, which uses the bulkCreate method of the User model to insert multiple users into the database
// The { individualHooks: true } option is provided to trigger any individual hooks associated with the model during the creation process
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

// Export the seedUsers function to be used in the database seed script: 'seed.js'
module.exports = seedUsers;