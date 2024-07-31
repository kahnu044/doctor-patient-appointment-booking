const express = require('express');
const router = express.Router();
const { createDoctor, updateDoctor } = require('../controller/doctorController')

// Create a new doctor
router.post('/', createDoctor);
router.put('/:id', updateDoctor);

module.exports = router;
