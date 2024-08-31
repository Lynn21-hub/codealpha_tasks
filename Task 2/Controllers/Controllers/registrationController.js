const Registration = require('../Models/Registration');
const Event = require('../Models/Event');

exports.registerForEvent = (req, res) => {
    Event.findById(req.params.eventId, (err, event) => {
        if (err) return res.status(500).send(err);
        if (!event) return res.status(404).send('Event not found');
        if (event.currentAttendees >= event.maxAttendees) return res.status(400).send('Event is full');

        const registration = new Registration({ event: event._id, user: req.user.id });
        registration.save((err, savedRegistration) => {
            if (err) return res.status(500).send(err);
            
            event.currentAttendees++;
            event.save();

            res.status(201).json(savedRegistration);
        });
    });
};

exports.listUserRegistrations = (req, res) => {
    Registration.find({ user: req.user.id }).populate('event').exec((err, registrations) => {
        if (err) return res.status(500).send(err);
        res.json(registrations);
    });
};
