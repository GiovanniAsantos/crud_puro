import React, { useEffect, useState } from 'react';
import { Button, Space, Table, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './body.css';
import axios from 'axios';


export const Body = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  const getProductsData = async () => {
    try {
      const response = await axios.get('https://6657b1f65c36170526459afa.mockapi.io/Produtos');
      console.log('Response data:', response.data);
      setProdutos(response.data);  // Atualiza o estado com os dados da API
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    getProductsData();  // Chama a API ao montar o componente
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',  // O campo "name" é retornado pela API
      key: 'name',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',  // O campo "quantity" é retornado pela API
      key: 'quantity',
    },
    {
      title: 'Preço',
      dataIndex: 'price',  // O campo "price" é retornado pela API
      key: 'price',
      render: (text) => `R$ ${parseFloat(text).toFixed(2)}`,  // Formata o preço, convertendo para número
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditar(record.id)}>Editar</Button>
          <Button type="danger" onClick={() => handleRemove(record.id)}>Remover</Button>
        </Space>
      ),
    },
  ];

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://6657b1f65c36170526459afa.mockapi.io/Produtos/${id}`);
      const newData = produtos.filter((item) => item.id !== id);
      setProdutos(newData);
      message.success('Produto removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
      message.error('Erro ao remover o produto. Tente novamente.');
    }
  };
  const handleEditar = (id) => {
    // Encontrar o produto específico pelo id
    const produto = produtos.find((prod) => prod.id === id);

    // Navegar para a página de edição e passar o produto via state
    navigate('/editar', { state: { produto } });
  };


  return (
    <div className="divBody">
      <div className="buttonCadastrar">
        <Link to="/cadastro">
          <Button type="primary" size="large" shape="round">
            Cadastrar Novo Produto
          </Button>
        </Link>
      </div>
      <div className="divTable">
        <Table 
          dataSource={produtos}
          columns={columns}
          rowKey="id"         // Usa "id" como chave única
          pagination={false}  // Desabilita a paginação
        />
      </div>
    </div>
  );
};
