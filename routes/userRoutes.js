// routes/userRoutes.js
const express = require("express");
const User = require("../models/User"); // Ajuste o caminho conforme necessário
const router = express.Router();

// 1. Criar um novo usuário
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error); // Log detalhado do erro
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// 2. Listar todos os usuários
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error); // Log detalhado do erro
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
});

// 3. Listar usuário por ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error); // Log detalhado do erro
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// 4. Atualizar usuário
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error); // Log detalhado do erro
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// 5. Deletar usuário
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error); // Log detalhado do erro
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

module.exports = router;
