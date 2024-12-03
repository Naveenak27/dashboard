// models/manager.js
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    name: {
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
  Manager.associate = (models) => {
    Manager.belongsTo(models.Employee, { foreignKey: 'userId', as: 'Employee' }); // Adding alias
  };

  return Manager;
};
