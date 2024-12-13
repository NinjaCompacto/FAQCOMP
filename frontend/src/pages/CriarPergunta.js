import React, { useEffect, useState } from "react";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/CriarPergunta.css";

const CriarPergunta = () => {
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("None");
  const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro

  const navigate = useNavigate();

  // Função para buscar categorias do backend
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

    // Faz uma requisição POST para criar a pergunta
    fetch("http://localhost:5000/api/questions", {
      method: "POST",
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
          alert("Pergunta criada com sucesso!");
          navigate("/adm/perguntas"); // Redireciona para a lista de perguntas
        } else {
          alert("Erro ao criar a pergunta.");
        }
      })
      .catch((error) => console.error("Erro ao criar pergunta:", error));
  };

  return (
    <div className="criar-pergunta-container">
      <h2>Criar Nova Pergunta</h2>
      <Form>
        <FormGroup>
          <Label for="titulo">Título</Label>
          <Input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            invalid={!!errors.titulo} // Aplica estilo de erro se houver mensagem
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
            invalid={!!errors.categoria} // Aplica estilo de erro se houver mensagem
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

export default CriarPergunta;
