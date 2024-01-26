// Import required Node.js modules
const path = require('path'); // Module for working with file and directory paths
const express = require('express'); // Web application framework for Node.js
const session = require('express-session'); // Session middleware for Express
const exphbs = require('express-handlebars'); // View engine for Express
const routes = require('./controllers'); // Import custom route handlers
const helpers = require('./utils/helpers'); // Import custom helper functions
require('dotenv').config(); // Load environment variables from a .env file

// Import Sequelize and create a connection to the database
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 3001; // Set the port for the application

// Create an instance of the Handlebars view engine with custom helpers
const hbs = exphbs.create({ helpers });

// Configuration for session handling
const sess = {
  secret: process.env.SESSION_SECRET, // Secret key for session encryption
  cookie: {
    maxAge: 86400000, // Session expiration time in milliseconds (5 minutes)
    httpOnly: true, // Session cookie is not accessible via client-side JavaScript
    secure: false, // Only send the cookie over HTTPS if secure is set to true
    sameSite: 'strict', // Cookie is only sent in a first-party context
  },
  resave: false, // Do not save the session if it wasn't modified
  saveUninitialized: true, // Save new sessions even if they haven't been modified
  store: new SequelizeStore({
    db: sequelize // Store sessions in the Sequelize database
  })
};

// Use the session middleware with the defined configuration
app.use(session(sess));

// Set up Handlebars as the view engine for Express
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up middleware for serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes for the application
app.use(routes);

// Synchronize the Sequelize models with the database and start the Express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
 