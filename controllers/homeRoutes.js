const router = require('express').Router();
const { User, Event, Rsvp, Venue } = require('../models');
const withAuth = require('../utils/auth');

// Home Page
router.get('/', async (req, res) => {
  try {
    // Fetch all events with associated user information
    const eventData = await Event.findAll({
      include: [
        { model: User, attributes: ['username'] },
      ],
    });

    // Convert Sequelize instances to plain objects for rendering
    const events = eventData.map((event) => event.get({ plain: true }));

    // Render homepage with events and login status
    res.render('homepage', {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Events Page
router.get('/events', async (req, res) => {
  try {
    // Fetch all events with associated user and RSVP information
    const eventData = await Event.findAll({
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Rsvp,
          include: [{ model: User, attributes: ['username'] }],
        }
      ],
    });

    // Convert Sequelize instances to plain objects for rendering
    const events = eventData.map((event) => event.get({ plain: true }));

    // Render events page with events, login status, and default details visibility
    res.render('event', {
      events,
      logged_in: req.session.logged_in,
      showDetails: false,
    });
  } catch (err) {
    // Handle internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Individual Event Page
router.get("/event/:id", withAuth, async (req, res) => {
  try {
    // Fetch a specific event with associated user and RSVP information
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Rsvp,
          include: [{ model: User, attributes: ['username'] }],
        },
        Venue,
      ],
    });

    // Convert Sequelize instance to plain object for rendering
    const event = eventData.get({ plain: true });

    // Render individual event page with event details, login status, and details visibility
    res.render('event', {
      ...event,
      logged_in: req.session.logged_in,
      showDetails: true,
    });
  } catch (err) {
    // Handle internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// RSVP button
router.post('/event/:id/rsvp', withAuth, async (req, res) => {
  try {
    // Fetch the event for which RSVP is requested
    const event = await Event.findByPk(req.params.id);

    // Check if the user has already RSVP'd for the event
    const existingRSVP = await Rsvp.findOne({
      where: {
        user_id: req.session.user_id,
        event_id: event.id,
      },
    });

    if (existingRSVP) {
      // Redirect if user has already RSVP'd
      res.redirect(`/event/${event.id}`);
    } else {
      // Create a new RSVP and redirect
      const rsvp = await Rsvp.create({
        user_id: req.session.user_id,
        event_id: event.id,
      });

      res.redirect(`/event/${event.id}`);
    }
  } catch (err) {
    // Handle internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// My Events Page
router.get('/myevents', withAuth, async (req, res) => {
  try {
    // Fetch events for which the user has RSVP'd
    const rsvpEventData = await Rsvp.findAll({
      where: { user_id: req.session.user_id },
      include: [
        { 
          model: Event, 
          include: [{ model: User, attributes: ['username'] }] 
        }
      ],
    });

    // Convert Sequelize instances to plain objects for rendering
    const rsvpEvents = rsvpEventData.map((rsvp) => rsvp.event.get({ plain: true }));

    // Fetch events created by the user
    const createdEventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    // Convert Sequelize instances to plain objects for rendering
    const createdEvents = createdEventData.map((event) => event.get({ plain: true }));

    // Render myevents page with RSVP and created events, and login status
    res.render('myevents', {
      rsvpEvents,
      createdEvents,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Log the error and handle internal server error
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile Page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Fetch user information excluding the password
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    // Convert Sequelize instance to plain object for rendering
    const user = userData.get({ plain: true });

    // Fetch events created by the user
    const eventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    // Convert Sequelize instances to plain objects for rendering
    const events = eventData.map((event) => event.get({ plain: true }));

    // Fetch all venues
    const venueData = await Venue.findAll();

    // Convert Sequelize instances to plain objects for rendering
    const venues = venueData.map((venue) => venue.get({ plain: true }));

    // Render profile page with user details, created events, and login status
    res.render('profile', {
      ...user,
      events,
      venues,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Login Page
router.get('/login', (req, res) => {
  // Redirect to profile page if already logged in
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render login page
  res.render('login');
});

module.exports = router;
