// routes/managerRoutes.js
const express = require('express');
const { Manager } = require('../models');  // Import Manager model
const router = express.Router();

// Get all managers
router.get('/', async (req, res) => {
  try {
    const managers = await Manager.findAll();
    res.json(managers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching managers' });
  }
});

// Add a new manager
router.post('/', async (req, res) => {
  try {
    const newManager = await Manager.create(req.body);
    res.status(201).json(newManager);
  } catch (err) {
    res.status(400).json({ error: 'Error creating manager' });
  }
});

// Get manager by ID
router.get('/:id', async (req, res) => {
  try {
    const manager = await Manager.findByPk(req.params.id);
    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ error: 'Manager not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching manager' });
  }
});


// Update manager by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Manager.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedManager = await Manager.findByPk(req.params.id);
      res.json(updatedManager);
    } else {
      res.status(404).json({ error: 'Manager not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error updating manager' });
  }
});

// Delete manager by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Manager.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send(); // No content to send back
    } else {
      res.status(404).json({ error: 'Manager not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting manager' });
  }
});

module.exports = router;
