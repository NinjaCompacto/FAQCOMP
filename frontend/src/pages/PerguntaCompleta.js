import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { Button } from "reactstrap";
import "./css/PerguntaCompleta.css";

const PerguntaCompleta = () => {
  const { id } = useParams(); // Obtém o ID da pergunta da URL
  const [pergunta, setPergunta] = useState(null);
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  // Função para buscar os detalhes da pergunta
  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPergunta(data);
        fetch(`http://localhost:5000/api/categories/${data.category_id}`)
          .then((res) => res.json())
          .then((cat) => setCategoria(cat.name))
          .catch((error) => console.error("Erro ao buscar categoria:", error));
      })
      .catch((error) => console.error("Erro ao buscar pergunta:", error));
  }, [id]);

  if (!pergunta) {
    return (
      <div>
        <Navbar />
        <p>Carregando pergunta...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pergunta-completa-container">
        <h1 className="pergunta-titulo">{pergunta.title}</h1>
        <p className="pergunta-categoria">
          Categoria: <strong>{categoria || "Sem Categoria"}</strong>
        </p>
        <div
          className="pergunta-conteudo"
          dangerouslySetInnerHTML={{ __html: pergunta.content }}
        />
        <Button color="secondary" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default PerguntaCompleta;
