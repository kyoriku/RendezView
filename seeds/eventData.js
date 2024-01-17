// Import the Post model from the specified path
const { Event } = require('../models');

// Define an array of event data, each object representing an event with a name, description, date, location, and user ID
const eventData = [
  {
    name: "Dance Fever Night",
    description: "Get ready to dance the night away! Join us for a high-energy party featuring live DJs, light shows, and a vibrant dance floor. Don't miss the hottest party in town!",
    date: "2024-02-22",
    location: "The Groove Lounge",
    user_id: 1
  },
  {
    name: "Neon Glow Bash",
    description: "Experience the ultimate neon-themed party! Dress in your brightest colors and join us for a night of glowing fun. Live music, glow-in-the-dark decorations, and unforgettable moments await!",
    date: "2024-03-15",
    location: "Electric Dreams Club",
    user_id: 2,
  },
  {
    name: "Masquerade Extravaganza",
    description: "Step into a world of mystery and glamour at our masquerade party. Wear your most enchanting mask, enjoy live entertainment, and dance the night away in style.",
    date: "2024-04-10",
    location: "Grand Ballroom",
    user_id: 3
  }
]

// Define a function called seedEvents, which uses the bulkCreate method of the Event model to insert multiple events into the database
const seedEvents = () => Event.bulkCreate(eventData);

// Export the seedEvents function to be used in the database seed script: 'seed.js'
module.exports = seedEvents;
