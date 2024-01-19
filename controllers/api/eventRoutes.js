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

// Getting a single event, only available for users who are logged in

router.get(`/:id`, withAuth, async(req, res) =>{
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
        const newEvent = await Event.create({
            ...req.body,
            owner_id: req.session.owner_id,
        });

        res.status(200).json(newEvent);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deleting an event, only available for user who are logged in and is the creator of the event

router.delete(`/:id`, withAuth, async (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((deletedEvent) => {
            res.json(deletedEvent);
        }) 
        .catch ((err) => res.status(500).json(err));
});

// Updating an event, only available for users who are logged in and is the creator of the event

router.put(`/:id`, withAuth, async (req, res) => {
    Event.update(
        {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            user_id: req.body.user_iq
        },
        {
            where: {
                id: req.params.id,
            }
        }
    )
        .then((updatedEvents) => {
            res.json(updatedEvents);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;
