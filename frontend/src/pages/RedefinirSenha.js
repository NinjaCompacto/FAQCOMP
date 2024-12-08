import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

function RedefinirSenha() {
  const { token } = useParams();
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        novaSenha,
      });
      setMensagem("Senha redefinida com sucesso!");
    } catch (error) {
      setMensagem(
        "Erro ao redefinir senha. Verifique o link ou tente novamente."
      );
    }
  };

  return (
    <div className="reset-password-page">
      <Form className="centered-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="novaSenha">Nova Senha</Label>
          <Input
            id="novaSenha"
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Redefinir Senha</Button>
      </Form>
      {mensagem && <p className="response-message">{mensagem}</p>}
    </div>
  );
}

export default RedefinirSenha;
