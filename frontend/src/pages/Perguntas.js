import React, { useEffect, useState } from "react";
import { Table, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import NavbarAdm from "../Components/NavBarAdm/NavbarAdm.js";
import "./css/perguntas.css";

const Perguntas = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("None");
  const [pesquisa, setPesquisa] = useState("");
  const navigate = useNavigate();

  // Função para buscar perguntas
  const fetchPerguntas = () => {
    fetch("http://localhost:5000/api/questions")
      .then((response) => response.json())
      .then((data) => setPerguntas(data))
      .catch((error) => console.error("Erro ao buscar perguntas:", error));
  };

  // Função para buscar categorias
  const fetchCategorias = () => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  };

  // Carregar perguntas e categorias ao montar o componente
  useEffect(() => {
    fetchPerguntas();
    fetchCategorias();
  }, []);

  // Função para deletar pergunta
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta pergunta?")) {
      fetch(`http://localhost:5000/api/questions/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Pergunta deletada com sucesso!");
            setPerguntas(perguntas.filter((pergunta) => pergunta.id !== id)); // Remove a pergunta da lista local
          } else {
            alert("Erro ao deletar a pergunta.");
          }
        })
        .catch((error) => console.error("Erro ao deletar pergunta:", error));
    }
  };

  // Filtrar perguntas por categoria e pesquisa
  const perguntasFiltradas = perguntas.filter((pergunta) => {
    const categoriaValida =
      categoriaSelecionada === "None" ||
      pergunta.category_id === parseInt(categoriaSelecionada);
    const pesquisaValida =
      pesquisa.trim() === "" ||
      pergunta.title.toLowerCase().includes(pesquisa.toLowerCase());
    return categoriaValida && pesquisaValida;
  });

  return (
        <div>
        <NavbarAdm />

          <div className="container">
          {/* Botão "Criar Pergunta" */}
          <div className="perguntas-header">
            <h2>Perguntas</h2>
            <div className="button-container">
                <Button color="primary" onClick={() => navigate("/adm/criar-pergunta")}>
                Criar Pergunta
                </Button>
            </div>
          </div>
          {/* Filtros */}
          <div className="filters-container">
              <Input
              type="text"
              placeholder="Pesquisar por título"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="search-bar"
              />
              <Input
              type="select"
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
              className="dropdown-filter"
              >
              <option value="None">Todas as Categorias</option>
              {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                  </option>
              ))}
              </Input>
          </div>
          {/* Tabela de Perguntas */}
          <Table striped>
              <thead>
              <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Categoria</th>
                  <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              {perguntasFiltradas.map((pergunta, index) => (
                  <tr key={pergunta.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{pergunta.title}</td>
                  <td>
                      {
                      categorias.find((categoria) => categoria.id === pergunta.category_id)
                          ?.name || "Sem Categoria"
                      }
                  </td>
                  <td>
                    <div className="actionButton">
                      <Button  color="warning" size="sm"  onClick={() => navigate(`/adm/perguntas/editar/${pergunta.id}`)}>
                      Editar
                      </Button>{" "}
                      <Button color="danger" size="sm"  onClick={() => handleDelete(pergunta.id)} >
                      Deletar
                      </Button>
                    </div>
                  </td>
                  </tr>
              ))}
              </tbody>
          </Table>
          </div>
        </div>
  );
};

export default Perguntas;
