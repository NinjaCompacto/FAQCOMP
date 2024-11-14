const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret para assinar o JWT
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // Simule a verificação de credenciais (substitua por sua lógica de autenticação real)
    if (usuario === 'admin' && senha === '1234') {  // Exemplo: substitua isso com a lógica real
        // Gera um token JWT
        const token = jwt.sign({ usuario: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

        // Envia o token como resposta
        res.json({ token });
    } else {
        // Credenciais inválidas
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

module.exports = router;
