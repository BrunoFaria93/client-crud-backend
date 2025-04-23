const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Usando as rotas de usuário
app.use("/api", userRoutes);

// Rota básica para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

// Sincronizando banco de dados
// Em ambiente de produção, você deve gerenciar as migrações de forma diferente
if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Banco de dados sincronizado");
    })
    .catch((err) => {
      console.error("Erro ao sincronizar banco de dados:", err);
    });
}

// Iniciar o servidor apenas em desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// Exportação necessária para a Vercel
module.exports = app;
