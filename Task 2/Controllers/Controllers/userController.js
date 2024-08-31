const User = require('../Models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
    const user = new User(req.body);
    user.save((err, savedUser) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(savedUser);
    });
};

exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user || user.password !== req.body.password) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, 'your_secret_key');
        res.json({ token });
    });
};
