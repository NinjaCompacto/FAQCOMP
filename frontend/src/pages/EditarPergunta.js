import React, { useEffect, useState } from "react";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/EditarPergunta.css";

const EditarPergunta = () => {
  const { id } = useParams(); // Obtém o ID da pergunta da URL
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("None");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Função para buscar os detalhes da pergunta
  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitulo(data.title);
        setContent(data.content);
        setCategoriaSelecionada(data.category_id.toString());
      })
      .catch((error) => console.error("Erro ao buscar pergunta:", error));
  }, [id]);

  // Função para buscar categorias
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!titulo.trim()) {
      newErrors.titulo = "O título é obrigatório.";
    }
    if (!content.trim()) {
      newErrors.content = "O conteúdo (resposta) é obrigatório.";
    }
    if (categoriaSelecionada === "None") {
      newErrors.categoria = "Você deve selecionar uma categoria.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  const handleSave = () => {
    if (!validateFields()) {
      return; // Não prossegue se houver erros
    }

    // Faz uma requisição PUT para atualizar a pergunta
    fetch(`http://localhost:5000/api/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titulo,
        content: content,
        category_id: parseInt(categoriaSelecionada),
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Pergunta atualizada com sucesso!");
          navigate("/adm/perguntas"); // Redireciona para a lista de perguntas
        } else {
          alert("Erro ao atualizar a pergunta.");
        }
      })
      .catch((error) => console.error("Erro ao atualizar pergunta:", error));
  };

  return (
    <div className="editar-pergunta-container">
      <h2>Editar Pergunta</h2>
      <Form>
        <FormGroup>
          <Label for="titulo">Título</Label>
          <Input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            invalid={!!errors.titulo}
          />
          {errors.titulo && <p className="error-message">{errors.titulo}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="content">Conteúdo (Resposta)</Label>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="Digite a resposta aqui..."
          />
          {errors.content && <p className="error-message">{errors.content}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="categoria">Categoria</Label>
          <Input
            id="categoria"
            type="select"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            invalid={!!errors.categoria}
          >
            <option value="None">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </Input>
          {errors.categoria && <p className="error-message">{errors.categoria}</p>}
        </FormGroup>
        <Button color="success" onClick={handleSave}>
          Salvar
        </Button>{" "}
        <Button color="secondary" onClick={() => navigate("/adm/perguntas")}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default EditarPergunta;
