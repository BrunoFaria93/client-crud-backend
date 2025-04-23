const User = require("../models/User");

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário." });
    }
  },

  async findAll(req, res) {
    const users = await User.findAll();
    res.json(users);
  },

  async update(req, res) {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });
    res.sendStatus(204);
  },

  async delete(req, res) {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.sendStatus(204);
  },
};
