const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define o modelo
const User = sequelize.define
  ? sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    })
  : {
      /* mock implementation */
    };

module.exports = User;
