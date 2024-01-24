const router = require(`express`).Router();
const { Event } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

// Getting all events when user presses "Events" tab; all users have access 
router.get(`/`, async (req, res) => {
  try {
    const eventData = await Event.findAll();
    res.render('event', {
      ...eventData,
      logged_in: req.session.logged_in,
    });;
  } catch (err) {
    res.status(500).json(err);
  }
});

// Getting a single event, only available for users who are logged in
router.get(`/:id`, withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id)
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creating an event, only available for users who are logged in
router.post(`/`, withAuth, async (req, res) => {
  try {
    const { name, description, date, venue } = req.body;

    const newEvent = await Event.create({
      name,
      description,
      date,
      venue_id: venue,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updating an event, only available for users who are logged in and is the creator of the event
router.put(`/:id`, /*withAuth,*/ async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const updatedEvents = await Event.update(
      {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        venue_id: req.body.venue,
        // type_id: req.body.type_id,
        // attendees: req.body.attendees,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );

    res.json(updatedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Deleting an event, only available for users who are logged in and are the creators of the event
router.delete(`/:id`, withAuth, async (req, res) => {
  try {
    const deletedEvent = await Event.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json(deletedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;