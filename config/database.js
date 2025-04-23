require("dotenv").config(); // Para carregar as variáveis do .env
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Nome do usuário (root, no seu caso)
  process.env.DB_PASS, // Senha do usuário
  {
    host: process.env.DB_HOST, // Endereço do servidor (localhost no seu caso)
    dialect: process.env.DB_DIALECT, // Dialeto do banco de dados (mysql)
    logging: false, // Desativa o log de SQL no terminal (opcional)
  }
);

module.exports = sequelize;
