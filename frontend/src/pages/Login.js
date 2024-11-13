import './css/Login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';

function Login() {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setErro] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      //envia uma requisição para validação das credencias
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        usuario,
        senha
      });

      if (response.data.success){
        console.log("Login bem sucedido!");
        navigate('./menu')
      }
      else{
        setErro("Credencias invalidas");
        console.log(usuario);  
        console.log(senha);  
      }
    }catch(err){
      console.error(err);
      setErro("Erro ao fazer login!");
    }
  };

    return (
      <div className="login-container">
        <Form className="centered-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="usuario">Usuário</Label>
            <Input 
              id="usuario" 
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="senha">Senha</Label>
            <Input 
              id="senha" 
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} />
          </FormGroup>
          {error && <p className="error-message">{error}</p>}
          <Button type='submit'>Entrar</Button>
        </Form>
      </div>
    );
  }
export default Login;
