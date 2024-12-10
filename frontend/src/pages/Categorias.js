import "./css/categorias.css"
import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";

import NavbarAdm from "../Components/NavBarAdm/NavbarAdm.js";
import CriarCategoria from "./../Components/CriarCategoria/CriarCategoria.js"
import EditarCategoria from "../Components/EditarCategoria/EditarCategoria.js";


const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    // Função para buscar categorias do backend
    const fetchCategorias = () => {
      fetch("http://localhost:5000/api/categories") // Ajuste a URL conforme seu backend
        .then((response) => response.json())
        .then((data) => setCategorias(data))
        .catch((error) => console.error("Erro ao buscar categorias:", error));
    };
  
    // Chama fetchCategorias ao carregar o componente
    useEffect(() => {
      fetchCategorias();
    }, []);

    // Funções de manipulação
    const handleEdit = (categoria) => {
        setCategoriaSelecionada(categoria); // Define a categoria selecionada
        setIsEditOpen(true); // Abre o Offcanvas
    };

  const handleDelete = (id) => {
    console.log(`Deletar categoria com ID: ${id}`);
    fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCategorias(categorias.filter((categoria) => categoria.id !== id));
          alert("Categoria deletada com sucesso!");
        } else {
          return response.json(); // Lê a resposta do erro
        }
      })
      .then((errorData) => {
        if (errorData && errorData.error) {
          // Exibe o erro específico relacionado à chave estrangeira
          if (errorData.error.includes("violação de chave estrangeira")) {
            alert(
              "Não é possível excluir esta categoria porque ela possui perguntas associadas. Por favor, remova ou altere as perguntas antes de tentar novamente."
            );
          } else {
            alert("Erro ao deletar categoria: " + errorData.error);
          }
        }
      })
      .catch((error) => console.error("Erro ao deletar categoria:", error));
  };

  // Criar categorias
  const handleCreate = () => {
    console.log("Criar nova categoria");
    
  };

  return (
    <div>
      <NavbarAdm />
      <div className="categorias-header">
        <h2>Categorias</h2>
        <CriarCategoria onCategoriaCriada={() => fetchCategorias()} />
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, index) => (
            <tr key={categoria.id}>
              <th scope="row">{index + 1}</th>
              <td>{categoria.name}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  onClick={() => handleEdit(categoria)}
                >
                  Editar
                </Button>{" "}
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(categoria.id)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {categoriaSelecionada && (
        <EditarCategoria
          isOpen={isEditOpen}
          toggle={() => setIsEditOpen(!isEditOpen)}
          categoria={categoriaSelecionada}
          onCategoriaEditada={fetchCategorias}
        />
      )}
    </div>
  );
};

export default Categorias;
