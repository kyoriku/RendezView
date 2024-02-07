// Importing necessary modules and dependencies
const router = require(`express`).Router();
const { Event, Rsvp } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

// Route to get all events when the "Events" tab is pressed; accessible to all users
router.get(`/`, async (req, res) => {
  try {
    // Fetch all event data from the database
    const eventData = await Event.findAll();
    // Render the 'event' template with event data and login status
    res.render('event', {
      ...eventData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle errors by sending a 500 status and the error details
    res.status(500).json(err);
  }
});

// Route to get a single event by ID; only accessible to logged-in users (withAuth middleware)
router.get(`/:id`, withAuth, async (req, res) => {
  try {
    // Find a specific event by its primary key (ID)
    const eventData = await Event.findByPk(req.params.id);
    // Send the event data as a JSON response with a 200 status
    res.status(200).json(eventData);
  } catch (err) {
    // Handle errors by sending a 500 status and the error details
    res.status(500).json(err);
  }
});

// Route to create a new event; only accessible to logged-in users (withAuth middleware)
router.post(`/`, withAuth, async (req, res) => {
  try {
    // Destructure relevant data from the request body
    const { name, description, date, venue } = req.body;
    // Create a new event in the database with the provided data
    const newEvent = await Event.create({
      name,
      description,
      date,
      venue_id: venue,
      user_id: req.session.user_id,
    });
    // Send the newly created event as a JSON response with a 200 status
    res.status(200).json(newEvent);
  } catch (err) {
    // Handle errors by sending a 400 status and the error details
    res.status(400).json(err);
  }
});

// Route to update an existing event; only accessible to the event creator when logged in
router.put(`/:id`, withAuth, async (req, res) => {
  try {
    // Update the event data in the database based on the provided request body
    const updatedEvents = await Event.update(
      {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        venue_id: req.body.venue,
        // Additional fields can be added for updating
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    // Send the updated event data as a JSON response
    res.json(updatedEvents);
  } catch (err) {
    // Handle errors by logging and sending a 500 status with an error message
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete an event; only accessible to the event creator when logged in
router.delete(`/:id`, withAuth, async (req, res) => {
  try {
    // Delete the event from the database based on the provided ID
    const deletedEvent = await Event.destroy({
      where: {
        id: req.params.id
      }
    });
    // Send a JSON response with the details of the deleted event
    res.json(deletedEvent);
  } catch (err) {
    // Handle errors by logging and sending a 500 status with an error message
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// RSVP button
router.post('/:id/rsvp', withAuth, async (req, res) => {
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

// Cancel RSVP button
router.post('/:id/cancel-rsvp', withAuth, async (req, res) => {
  try {
    // Fetch the event for which RSVP removal is requested
    const event = await Event.findByPk(req.params.id);

    // Find and delete the RSVP record
    await Rsvp.destroy({
      where: {
        user_id: req.session.user_id,
        event_id: event.id,
      },
    });

    res.redirect(`/event/${event.id}`);
  } catch (err) {
    // Handle internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
