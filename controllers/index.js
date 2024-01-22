const router = require('express').Router(); // Import the 'Router' module from the 'express' library

const apiRoutes = require('./api'); // Import the routes defined in the 'api' directory
const homeRoutes = require('./homeRoutes'); // Import the routes defined in the 'homeRoutes.js' file

router.use('/', homeRoutes); // Use the routes defined in 'homeRoutes.js' for the root path '/'
router.use('/api', apiRoutes); // Use the routes defined in 'api' directory for paths starting with '/api'

module.exports = router; // Export the configured router so it can be used by other parts of the application
