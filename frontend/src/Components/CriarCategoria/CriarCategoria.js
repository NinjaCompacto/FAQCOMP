import React, { useState } from "react";
import {
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./CriarCategoria.css";

const CriarCategoria = ({ onCategoriaCriada }) => {
  const [isOpen, setIsOpen] = useState(false); // Controla o estado do Offcanvas
  const [nome, setNome] = useState(""); // Armazena o nome da nova categoria

  const toggle = () => setIsOpen(!isOpen); // Abre e fecha o Offcanvas

  const handleSave = () => {
    if (!nome.trim()) {
      alert("O nome da categoria é obrigatório.");
      return;
    }

    // Faz uma requisição para criar a nova categoria
    fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nome }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Categoria criada com sucesso!");
          onCategoriaCriada(); // Atualiza a lista de categorias
          setIsOpen(false); // Fecha o Offcanvas
          setNome(""); // Limpa o campo de entrada
        } else {
          alert("Erro ao criar a categoria.");
        }
      })
      .catch((error) => console.error("Erro ao criar categoria:", error));
  };

  // Função para detectar a tecla Enter e salvar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // Salva ao pressionar Enter
    }
  };

  return (
    <div>
      <div className="createButton">
        <Button color="primary" onClick={toggle}>
          Criar Categoria
        </Button>
      </div>
      <Offcanvas isOpen={isOpen} toggle={toggle} direction="end">
        <OffcanvasHeader toggle={toggle}>Criar Nova Categoria</OffcanvasHeader>
        <OffcanvasBody>
          <Form>
            <FormGroup>
              <Label for="nomeCategoria">Nome da Categoria</Label>
              <Input
                id="nomeCategoria"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyDown={handleKeyDown} // Adiciona o evento de teclado
              />
            </FormGroup>
            <Button color="success" onClick={handleSave}>
              Salvar
            </Button>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default CriarCategoria;
