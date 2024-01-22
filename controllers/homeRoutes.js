const router = require('express').Router();
const { User, Event, Rsvp } = require('../models');
const withAuth = require('../utils/auth');

// Home Page
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        { model: User, attributes: ['username'] },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render('homepage', {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Events Page
router.get('/events', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Rsvp,
          include: [{ model: User, attributes: ['username'] }],
        }
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render('event', {
      events,
      logged_in: req.session.logged_in,
      showDetails: false,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Individual Event Page
router.get("/event/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Rsvp,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in,
      showDetails: true,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// RSVP button
router.post('/event/:id/rsvp', withAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    const existingRSVP = await Rsvp.findOne({
      where: {
        user_id: req.session.user_id,
        event_id: event.id,
      },
    });

    if (existingRSVP) {
      res.redirect(`/event/${event.id}`);
    } else {
      const rsvp = await Rsvp.create({
        user_id: req.session.user_id,
        event_id: event.id,
      });

      res.redirect(`/event/${event.id}`);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// My Events Page
router.get('/myevents', withAuth, async (req, res) => {
  try {
    const rsvpEventData = await Rsvp.findAll({
      where: { user_id: req.session.user_id },
      include: [
        { 
          model: Event, 
          include: [{ model: User, attributes: ['username'] }] 
        }
      ],
    });

    const rsvpEvents = rsvpEventData.map((rsvp) => rsvp.event.get({ plain: true }));

    const createdEventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    const createdEvents = createdEventData.map((event) => event.get({ plain: true }));

    res.render('myevents', {
      rsvpEvents,
      createdEvents,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile Page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    const eventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render('profile', {
      ...user,
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Login Page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
