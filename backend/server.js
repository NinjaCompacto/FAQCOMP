const express = require('express');
const app = express();
const questionsRoutes = require('./routes/questions');
const categoriesRoutes = require('./routes/categories');
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rota base para perguntas e categorias
app.use('/api/questions', questionsRoutes);
app.use('/api/categories', categoriesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
