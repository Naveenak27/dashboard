// server.js

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

const app = express();

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes'); // Import manager routes
const loggerRoutes = require('./routes/authRoutes');

// Use the manager routes
app.use('/managers', managerRoutes);


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/total', employeeRoutes);

app.use('/api/employees', employeeRoutes);
app.use('/api/managers', managerRoutes); // Add manager routes
app.use('/api/logger', loggerRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
