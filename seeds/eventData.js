// Import the Post model from the specified path
const { Event } = require('../models');

// Define an array of event data, each object representing an event with a name, description, date, location, and user ID
const eventData = [
  {
    name: "Dance Fever Night",
    description: "Get ready to dance the night away! Join us for a high-energy party featuring live DJs, light shows, and a vibrant dance floor. Don't miss the hottest party in town!",
    date: "2024-02-22",
    user_id: 1,
    venue_id: 1
  },
  {
    name: "Neon Glow Bash",
    description: "Experience the ultimate neon-themed party! Dress in your brightest colors and join us for a night of glowing fun. Live music, glow-in-the-dark decorations, and unforgettable moments await!",
    date: "2024-03-15",
    user_id: 2,
    venue_id: 2
  },
  {
    name: "Masquerade Extravaganza",
    description: "Step into a world of mystery and glamour at our masquerade party. Wear your most enchanting mask, enjoy live entertainment, and dance the night away in style.",
    date: "2024-04-10",
    user_id: 3,
    venue_id: 3
  },
  {
    name: "Glow Rave Party",
    description: "Experience the ultimate glow-in-the-dark rave! Dance to the beats of top DJs, surrounded by neon lights and fluorescent decorations. Wear your brightest colors and let the party vibes take over.",
    date: "2024-05-10",
    user_id: 1,
    venue_id: 4
  },
  {
    name: "Summer Beach Bash",
    description: "Celebrate the summer vibes at our beach party! Enjoy live music, beach games, and refreshing tropical drinks. Get ready for a day of sun, sand, and endless fun by the ocean.",
    date: "2024-06-25",
    user_id: 2,
    venue_id: 5
  },
  {
    name: "Masquerade Ball After-Party",
    description: "Keep the celebration going after the masquerade ball! Join us for an exclusive after-party with DJ sets, dance performances, and a glamorous atmosphere. Unmask and let loose on the dance floor.",
    date: "2024-07-15",
    user_id: 3,
    venue_id: 6
  },
  {
    name: "VIP Rooftop Soiree",
    description: "Elevate your nightlife experience at our VIP rooftop soiree. Enjoy breathtaking views, premium cocktails, and live entertainment. Dress to impress for a night of sophistication and style.",
    date: "2024-08-20",
    user_id: 1,
    venue_id: 7
  },
  {
    name: "Enchanted Forest Gala",
    description: "Step into a magical world at our Enchanted Forest Gala. Immerse yourself in the beauty of nature, surrounded by twinkling lights, lush greenery, and enchanting music. It's a night of elegance and wonder.",
    date: "2024-09-30",
    user_id: 2,
    venue_id: 8
  },
  {
    name: "Tech Innovation Summit",
    description: "Explore the latest in technology and innovation at our Tech Innovation Summit. Join industry leaders, tech enthusiasts, and visionaries for insightful discussions, product showcases, and networking opportunities.",
    date: "2024-10-25",
    user_id: 3,
    venue_id: 9
  },
]

// Define a function called seedEvents, which uses the bulkCreate method of the Event model to insert multiple events into the database
const seedEvents = () => Event.bulkCreate(eventData);

// Export the seedEvents function to be used in the database seed script: 'seed.js'
module.exports = seedEvents;
