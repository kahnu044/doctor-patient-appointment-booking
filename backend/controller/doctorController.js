const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');

// Create a new doctor
const createDoctor = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        // Create a user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            role: 'doctor'
        });
        await user.save();

        // Create a doctor and associate with user
        const doctor = new Doctor({
            userId: user._id
        });
        await doctor.save();

        res.status(201).send({
            status: true,
            message: "Doctor created successfully",
            data: doctor
        });

    } catch (error) {
        console.log("error=>>>", error)
        res.status(500).send(error.message);
    }
};

module.exports = { createDoctor };
