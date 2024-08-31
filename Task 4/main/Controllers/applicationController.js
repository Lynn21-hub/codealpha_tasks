const Application = require('../Models/Application');
const Job = require('../Models/Job');

exports.applyForJob = (req, res) => {
    Job.findById(req.params.jobId, (err, job) => {
        if (err) return res.status(500).send(err);
        if (!job) return res.status(404).send('Job not found');

        const application = new Application({ job: job._id, user: req.user.id, resume: req.body.resume });
        application.save((err, savedApplication) => {
            if (err) return res.status(500).send(err);
            res.status(201).json(savedApplication);
        });
    });
};

exports.listUserApplications = (req, res) => {
    Application.find({ user: req.user.id }).populate('job').exec((err, applications) => {
        if (err) return res.status(500).send(err);
        res.json(applications);
    });
};
