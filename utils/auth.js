// Define a middleware function called 'withAuth' that takes three parameters: req (request), res (response), and next (next middleware function)
const withAuth = (req, res, next) => {
  // Check if the 'logged_in' property is not present in the session object
  if (!req.session.logged_in) {
    // If not logged in, redirect the user to the '/login' route
    res.redirect('/login');
  } else {
    // If logged in, call the next middleware in the stack
    next();
  }
};

// Export the 'withAuth' middleware function for use in other parts of the application
module.exports = withAuth;
