const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Rota para criar uma nova pergunta
router.post('/', async (req, res) => {
    const { title, content, category_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO questions (title, content, category_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para pegar todas as perguntas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para pegar uma pergunta específica pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM questions WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar uma pergunta pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, category_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE questions SET title = $1, content = $2, category_id = $3 WHERE id = $4 RETURNING *',
            [title, content, category_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar uma pergunta pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }
        res.json({ message: 'Pergunta deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
