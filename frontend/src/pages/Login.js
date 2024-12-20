import "./css/Login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          usuario, // Envia o nome de usuário
          senha, // Envia a senha
        }
      );

      console.log(usuario);
      console.log(senha);

      // Armazena o token JWT no localStorage
      localStorage.setItem("authToken", response.data.token);

      // Redireciona o usuário para a página de perguntas após o login bem-sucedido
      navigate("/adm/perguntas");
    } catch (error) {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <Form className="centered-form" onSubmit={handleSubmit}>
        <h2>Bem-vindo ao FAQICOMP</h2>
        <FormGroup>
          <Label for="usuario">Usuário</Label>
          <Input
            id="usuario"
            type="text"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Entrar</Button>
      </Form>
    </div>
  );
}
export default Login;
