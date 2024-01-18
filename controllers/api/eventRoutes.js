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

// Creating an event 

router.post(`/`, withAuth, async (req, res) => {
    try {
        const newEvent = await Event.create({
            ...req.body,
            owner_id: req.session.owner_id,
        });

        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err);
    }
});


// Deleting an event 

router.delete(`/:id`, async (req, res) => {
    try {
        const eventData = await Event.destroy({
            where: {
                id: req.params.id
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
})