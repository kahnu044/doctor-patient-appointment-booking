const express = require('express');
const router = express.Router();
const { createDoctor } = require('../controller/doctorController')

// Create a new doctor
router.post('/', createDoctor);

module.exports = router;
