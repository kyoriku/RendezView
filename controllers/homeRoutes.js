const router = require('express').Router();
const { User, Event } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));
    // res.status(200).json(events); // For Insomnia testing purposes

    res.render('homepage', {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/event/:id", withAuth, async (req, res) => { // Temporarily bypassing withAuth for testing purposes
router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const event = eventData.get({ plain: true });
    // res.status(200).json(event); // For Insomnia testing purposes

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
