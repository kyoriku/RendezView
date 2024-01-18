const router = require('express').Router(); // Importing the Router class from the 'express' module

const userRoutes = require('./userRoutes'); // Importing userRoutes module, which contains routes related to users
const eventRoutes = require('./eventRoutes'); // Importing eventRoutes module, which contains routes related to events

router.use('/users', userRoutes); // Using the router for paths starting with '/users', and delegating to the userRoutes module
router.use('/events', eventRoutes); // Using the router for paths starting with '/events', and delegating to the eventRoutes module

module.exports = router; // Export the configured router so it can be used by other parts of the application
