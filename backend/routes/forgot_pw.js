const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Modelo de usuário

const router = express.Router();

// Configurar transporte de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/auth/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Enviar e-mail com o link de redefinição de senha
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Redefinição de senha",
      html: `<p>Clique no link abaixo para redefinir sua senha:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "E-mail de redefinição de senha enviado" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao processar solicitação" });
  }
});

module.exports = router;
