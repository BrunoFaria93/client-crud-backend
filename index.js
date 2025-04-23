// index.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database"); // Certifique-se de que a configuração do banco de dados está correta
const userRoutes = require("./routes/userRoutes"); // Importe as rotas do usuário

const app = express();
app.use(express.json()); // Para ler JSON do corpo das requisições
app.use(cors()); // Se você precisar de CORS, caso contrário, remova essa linha

// Usando as rotas de usuário
app.use("/api", userRoutes);

// Sincronizando com o banco de dados
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Banco de dados sincronizado");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar banco de dados:", err);
  });

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
