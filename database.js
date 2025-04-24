const { Sequelize } = require("sequelize");

// Para ambiente de produção na Vercel, retornar um "mock" do Sequelize
// até configurarmos corretamente o banco de dados
if (process.env.NODE_ENV === "production") {
  // Retorna um "mock" do sequelize para evitar erros na Vercel
  const mockSequelize = {
    sync: () => Promise.resolve(),
    define: () => ({
      findAll: () => Promise.resolve([]),
      findByPk: () => Promise.resolve(null),
      create: () => Promise.resolve({}),
      // outros métodos que você possa precisar
    }),
  };

  module.exports = mockSequelize;
} else {
  // Configuração normal para desenvolvimento local
  const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  module.exports = sequelize;
}
