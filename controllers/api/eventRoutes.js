const router = require(`express`).Router(); 
const { Event } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

// Getting all events when user presses "Events" tab; all users have access 

router.get(`/`, async (req,res) => {
    try {
        const eventData = await Event.findAll();
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Getting a single event 

router.get(`/:event_id`)