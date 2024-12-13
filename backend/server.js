const express = require("express");
const app = express();
const cors = require("cors");

const questionsRoutes = require("./routes/questions");
const categoriesRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 5000;

// Configuração do CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.6:3000"], // Permite o frontend acessar o backend
    methods: ["GET", "POST", "PUT", "DELETE"], // Especifique os métodos que quer permitir
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

app.use(express.json());

// Rota base para perguntas e categorias
app.use("/api/questions", questionsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
