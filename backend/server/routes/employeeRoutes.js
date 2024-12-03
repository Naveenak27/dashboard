const express = require('express');
const { Employee ,Manager} = require('../models');  // Import Employee model
const router = express.Router();




// Route to get all Employees with their Managers
router.get('/employees-with-managers', async (req, res) => {
  try {
    // Fetch all employees along with their managers using Sequelize's `include`
    const employees = await Employee.findAll({
      include: {
        model: Manager, // Include the Manager model
        as: 'Managers'  // Alias for managers if needed
      },
    });

    // Return the joined data
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees with managers:', error);
    res.status(500).json({ error: 'An error occurred while fetching employees and managers.' });
  }
});


// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Error creating employee' });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
});

// Update employee by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error updating employee' });
  }
});

// Delete employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send(); // No content to send back
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

module.exports = router;
