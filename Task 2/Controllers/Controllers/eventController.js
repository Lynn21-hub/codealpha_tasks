const Event = require('../Models/Event');

exports.createEvent = (req, res) => {
    const event = new Event(req.body);
    event.save((err, savedEvent) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(savedEvent);
    });
};

exports.getEventDetails = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) return res.status(500).send(err);
        if (!event) return res.status(404).send('Event not found');
        res.json(event);
    });
};

exports.listEvents = (req, res) => {
    Event.find({}, (err, events) => {
        if (err) return res.status(500).send(err);
        res.json(events);
    });
};
