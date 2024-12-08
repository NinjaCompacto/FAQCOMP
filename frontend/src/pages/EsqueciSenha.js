import { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(
        "Instruções para redefinir sua senha foram enviadas ao seu e-mail."
      );
    } catch (error) {
      setMessage("Erro ao enviar e-mail. Verifique o endereço fornecido.");
    }
  };

  return (
    <div className="forgot-password-page">
      <Form className="centered-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Digite seu e-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Enviar</Button>
      </Form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
}

export default EsqueciSenha;
