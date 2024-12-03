// models/employee.js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {});

  // Associations
  Employee.associate = (models) => {
    Employee.hasMany(models.Manager, { foreignKey: 'userId', as: 'Managers' }); // Adding alias
  };

  return Employee;
};
