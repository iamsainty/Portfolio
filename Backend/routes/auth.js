const express = require('express');
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Register a user using POST
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate the salt
        const safepassword = await bcrypt.hash(req.body.password, salt); // Encrypting the password with the salt
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: safepassword,
        });
        // Using jwt
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.status(201).json({ message: 'User created!', data: user, token: token });
    } catch (err) {
        res.status(400).json({ message: "Failed to create the user.", error: err });
    }
});

//login a user using POST
router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }); 
        if (!user) return res.status(401).json({ message: "User does not exist" });
        
        // Checking if passwords match
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(401).json({ auth: false, message: "Invalid credentials" })

        // Create and send the JSON Web Token
        const token = jwt.sign({ id: user.id}, JWT_SECRET);
        res.status(200).send({ token: token, user: user });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "An error occurred during login." });
    }
})


module.exports = router;
