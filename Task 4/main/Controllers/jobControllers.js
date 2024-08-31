const Job = require('../Models/Job');

exports.createJob = (req, res) => {
    const job = new Job(req.body);
    job.save((err, savedJob) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(savedJob);
    });
};

exports.getJobDetails = (req, res) => {
    Job.findById(req.params.id, (err, job) => {
        if (err) return res.status(500).send(err);
        if (!job) return res.status(404).send('Job not found');
        res.json(job);
    });
};

exports.listJobs = (req, res) => {
    Job.find({}, (err, jobs) => {
        if (err) return res.status(500).send(err);
        res.json(jobs);
    });
};
