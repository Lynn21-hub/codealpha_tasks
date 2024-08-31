const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const eventRoutes = require('./Routes/eventRoutes');
const userRoutes = require('./Routes/userRoutes');
const registrationRoutes = require('./Routes/registrationRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/registrations', registrationRoutes);

mongoose.connect('mongodb://localhost/event-registration', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
