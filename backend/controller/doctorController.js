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

// Update doctor
const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, availableDays, workingHours, leaves, slotDuration } = req.body;

    try {
        // Find the doctor and populate user data
        const doctor = await Doctor.findById(id).populate('userId');
        if (!doctor) return res.status(404).send('Doctor not found');

        // Prepare update data for user
        const userUpdates = {};
        if (firstName !== undefined) userUpdates.firstName = firstName;
        if (lastName !== undefined) userUpdates.lastName = lastName;
        if (email !== undefined) userUpdates.email = email;
        if (password !== undefined) userUpdates.password = await bcrypt.hash(password, 10);

        // Update user if any user fields are provided
        if (Object.keys(userUpdates).length > 0) {
            const userUpdate = await User.findByIdAndUpdate(doctor.userId._id, userUpdates, { new: true });
            if (!userUpdate) return res.status(404).send('User not found');
        }

        // Prepare update data for doctor
        const doctorUpdates = {};
        if (availableDays !== undefined) doctorUpdates.availableDays = availableDays;
        if (workingHours !== undefined) doctorUpdates.workingHours = workingHours;
        if (leaves !== undefined) doctorUpdates.leaves = leaves;
        if (slotDuration !== undefined) doctorUpdates.slotDuration = slotDuration;

        // Update doctor if any doctor fields are provided
        if (Object.keys(doctorUpdates).length > 0) {
            Object.assign(doctor, doctorUpdates);
            await doctor.save();
        }

        // Populate user data in the updated doctor object
        await doctor.populate('userId');

        res.send(doctor);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { createDoctor, updateDoctor };
