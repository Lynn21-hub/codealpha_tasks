const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);
app.use('/applications', applicationRoutes);

mongoose.connect('mongodb://localhost/job-board', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
