import './css/Login.css';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';

function Login() {
    return (
      <div className="login-container">
        <Form className="centered-form">
          <FormGroup>
            <Label for="usuario">Usuário</Label>
            <Input id="usuario" type="text" />
          </FormGroup>
          <FormGroup>
            <Label for="senha">Senha</Label>
            <Input id="senha" type="password" />
          </FormGroup>
          <Button>Entrar</Button>
        </Form>
      </div>
    );
  }
export default Login;
