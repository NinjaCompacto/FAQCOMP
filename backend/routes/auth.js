const express = require('express');
const env = require('dotenv').config();
const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // validação das credencias do user adm
  if (usuario == process.env.DB_USER && senha == process.env.DB_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
