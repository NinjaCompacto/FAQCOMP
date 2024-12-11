import React, { useState, useEffect } from "react";
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

const EditarCategoria = ({ isOpen, toggle, categoria, onCategoriaEditada }) => {
  const [nome, setNome] = useState("");

  // Atualiza o estado `nome` com o nome da categoria quando ela mudar
  useEffect(() => {
    if (categoria) {
      setNome(categoria.name);
    }
  }, [categoria]);

  const handleSave = () => {
    if (!nome.trim()) {
      alert("O nome da categoria é obrigatório.");
      return;
    }

    // Faz uma requisição para atualizar a categoria no backend
    fetch(`http://localhost:5000/api/categories/${categoria.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nome }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Categoria editada com sucesso!");
          onCategoriaEditada(); // Atualiza a lista de categorias
          toggle(); // Fecha o Offcanvas
        } else {
          alert("Erro ao editar a categoria.");
        }
      })
      .catch((error) => console.error("Erro ao editar categoria:", error));
  };

  // Função para detectar a tecla Enter e salvar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // Salva ao pressionar Enter
    }
  };

  return (
    <Offcanvas isOpen={isOpen} toggle={toggle} direction="end">
      <OffcanvasHeader toggle={toggle}>Editar Categoria</OffcanvasHeader>
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
  );
};

export default EditarCategoria;
