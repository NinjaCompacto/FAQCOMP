import React, { useState, useEffect } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Input } from "reactstrap";
import Navbar from "../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("None");
  const [pesquisa, setPesquisa] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);
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

  // Alternar o estado do Accordion
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div>
      <Navbar onSearch={setPesquisa} />
      <div className="filter-container">
        <Input
          type="select"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          className="filter-dropdown"
        >
          <option value="None">Todas as Categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </Input>
      </div>
      <div className="accordion-container">
        <Accordion open={openAccordion} toggle={toggleAccordion}>
          {perguntasFiltradas.map((pergunta) => (
            <AccordionItem key={pergunta.id}>
              <AccordionHeader targetId={pergunta.id.toString()}>
                <strong>{pergunta.title}</strong> {/* Título em negrito */}
              </AccordionHeader>
              <AccordionBody accordionId={pergunta.id.toString()}>
                <div
                  className="content-summary"
                  dangerouslySetInnerHTML={{ __html: pergunta.content }}
                />
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => navigate(`/pergunta/${pergunta.id}`)}
                >
                  Ver mais
                </Button>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
