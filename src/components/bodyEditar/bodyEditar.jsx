import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './bodyEditar.css';

export const BodyEditar = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true); // Flag para verificar se os dados foram carregados
  const navigate = useNavigate();
  const location = useLocation(); // Usando o hook useLocation para pegar o state

  useEffect(() => {
    if (location.state && location.state.produto) {
      setFormData(location.state.produto); // Preenche o formulário com os dados recebidos via state
      setLoading(false); // Marca que o carregamento foi concluído
    } else {
      message.error('Produto não encontrado!');
      navigate('/'); // Redireciona para a página inicial caso o produto não seja encontrado
    }
  }, [location.state, navigate]);

  const onFinish = async (values) => {
    try {
      const { nome, quantidade, price } = values;

      // Faz a requisição PUT para atualizar o produto
      const response = await axios.put(
        `https://6657b1f65c36170526459afa.mockapi.io/Produtos/${formData.id}`,
        {
          name: nome,  // Correspondendo com a chave 'name'
          quantity: quantidade,  // Correspondendo com a chave 'quantity'
          price: price,  // Correspondendo com a chave 'price'
        }
      );

      message.success('Produto atualizado com sucesso!');
      navigate('/'); // Redireciona para a página principal após a atualização
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
      message.error('Erro ao atualizar o produto. Tente novamente.');
    }
  };

  const cancelar = () => {
    navigate('/'); // Navega para a página inicial
  };

  // Só renderiza o Formulário quando os dados estiverem carregados
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="divEditar">
      <h2 className="tituloEditar">Editar Produto</h2>

      {/* Formulário de edição */}
      <Form
        onFinish={onFinish}
        className="formEditar"
        layout="vertical"
        initialValues={{
          nome: formData.name, // Garantindo que as chaves correspondem
          quantidade: formData.quantity, // Garantindo que as chaves correspondem
          price: formData.price, // Garantindo que as chaves correspondem
        }}
      >
        {/* Campo Nome */}
        <Form.Item
          name="nome" // Nome do campo no formulário
          label="Nome do Produto"
          rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]} // Validação simples (campo obrigatório)
        >
          <Input placeholder="Ex: Produto 1" />
        </Form.Item>

        {/* Campo Quantidade */}
        <Form.Item
          name="quantidade" // Nome do campo no formulário
          label="Quantidade"
          rules={[{ required: true, message: 'Por favor, insira a quantidade!' }]} // Apenas validação de campo obrigatório
        >
          <Input type="number" placeholder="Ex: 10" />
        </Form.Item>

        {/* Campo Preço */}
        <Form.Item
          name="price" // Nome do campo no formulário
          label="Preço"
          rules={[{ required: true, message: 'Por favor, insira o preço!' }]} // Apenas validação de campo obrigatório
        >
          <Input type="number" placeholder="Ex: 100.00" />
        </Form.Item>

        {/* Botões de ação */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Salvar Alterações
            </Button>
            <Button htmlType="button" onClick={cancelar}>
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
