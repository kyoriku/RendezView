// Importing necessary modules and dependencies
const router = require(`express`).Router();
const { Event, Rsvp, Venue } = require(`../../models`);
const withAuth = require(`../../utils/auth`);
const { geocodeAddress } = require('../../utils/geocoding');

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
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: Venue }]
    });

    if (!event) {
      return res.status(404).send('Event not found');
    }

    // res.render('event-details', {
    //   name: event.name,
    //   description: event.description,
    //   date: event.date,
    //   venue: {
    //     name: event.venue.name,
    //     latitude: event.venue.latitude,
    //     longitude: event.venue.longitude
    //   },
    //   // ... other data
    // });
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).send('Server error');
  }
});

// Route to create a new event; only accessible to logged-in users (withAuth middleware)
router.post('/', withAuth, async (req, res) => {
  try {
    const { name, description, date, address } = req.body;

    // Geocode the address
    const { latitude, longitude } = await geocodeAddress(address);

    // Create a new venue
    const newVenue = await Venue.create({
      name: address,
      latitude,
      longitude
    });

    // Create a new event
    const newEvent = await Event.create({
      name,
      description,
      date,
      venue_id: newVenue.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
    console.log(latitude, longitude);
    console.log(address)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create event', details: err.message });
  }
})

// Route to update an existing event; only accessible to the event creator when logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { name, description, date, address } = req.body;
    const eventId = req.params.id;

    // Fetch the current event to get its venue
    const event = await Event.findByPk(eventId, { include: Venue });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Geocode the new address
    const { latitude, longitude } = await geocodeAddress(address);

    // Update or create venue
    let venue;
    if (event.venue) {
      venue = await Venue.update(
        { name: address, latitude, longitude },
        { where: { id: event.venue_id } }
      );
    } else {
      venue = await Venue.create({ name: address, latitude, longitude });
    }

    // Update the event
    const updatedEvent = await Event.update(
      {
        name,
        description,
        date,
        venue_id: venue.id,
      },
      {
        where: { id: eventId },
        returning: true,
      }
    );

    res.json(updatedEvent[1][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
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
