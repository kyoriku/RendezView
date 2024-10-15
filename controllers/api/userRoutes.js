const router = require('express').Router();
const { User } = require('../../models');

// Route for user registration
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Check if there's a redirect URL in the request body
      const redirectUrl = req.body.redirectUrl || '/profile';

      // Send a response with the redirect URL
      res.status(200).json({ 
        user: userData,
        redirectUrl: redirectUrl
      });
    });
  } catch (err) {
    console.error('Registration error:', err);

    // Check if it's a unique constraint error (e.g., email already exists)
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'This email is already registered.' });
    } else {
      res.status(500).json({ message: 'An error occurred during registration. Please try again.' });
    }
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // Check if there's a redirect URL in the query parameters
      const redirectUrl = req.query.redirect || '/profile';
      
      res.redirect(redirectUrl);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;