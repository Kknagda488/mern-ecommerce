'use strict';
const jwt = require('jsonwebtoken'); // Don't forget to import the jsonwebtoken library
module.exports = function (User) {
    User.createUser = async function (userData, callback) {
        try {
            // Check if a user with the same email already exists
            const userExists = await User.findOne({ where: { email: userData.email } });

            if (userExists) {
                const error = new Error('Email already registered');
                error.status = 400;
                callback(error);
                return;
            }

            // Create a new user
            const newUser = {
                ...userData
            };

            const user = await User.create(newUser);

            // Generate a JWT token for the newly registered user
            const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key_here', { expiresIn: '2d' });

            callback(null, { id: user.id, role: user.role, token: token });
        } catch (err) {
            console.error('Error while creating a user:', err);
            const error = new Error('User creation failed');
            error.status = 400;
            callback(error);
        }
    };


    User.loginUser = async function (req, res, userData) {
        const user = await User.findOne({ where: { email: userData.email } });

        if (!user || user.password !== userData.password) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key_here', { expiresIn: '2d' });

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        });

        res.status(201).json({ id: user.id, role: user.role, token: token });

    }
    User.logout = async function (req, res) {
        try {

            res.cookie('jwt', null, {
                expires: new Date(0),
                httpOnly: true,
            });

            res.sendStatus(200);
        } catch (err) {
            res.status(400).json(err);
        }
    };

    User.fetchUserById = async function (id, callback) {
        try {
            const user = await User.findById(id);
            callback(null, { id: user.id, addresses: user.addresses, email: user.email, role: user.role });
        } catch (err) {
            callback(err);
        }
    };


};
