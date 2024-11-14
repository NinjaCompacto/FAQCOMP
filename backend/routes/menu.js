const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// Rota protegida do menu do administrador
router.get('/menu', authenticateToken, (req, res) => {
    res.json({ message: 'Bem-vindo ao menu do administrador!' });
});

module.exports = router;
