import React, { useState } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bodyCadastro.css';

export const BodyCadastro = ({ addItem }) => {  
  const [form] = Form.useForm();  // Usando o hook Form do Ant Design
  const navigate = useNavigate();

  // Função de submit do formulário
  const onFinish = async (values) => {
    try {
      // Envia os dados para a API
      const response = await axios.post('https://6657b1f65c36170526459afa.mockapi.io/Produtos', {
        name: values.nome,
        quantity: values.quantidade,
        price: values.price,
      });

      // Se o callback addItem for passado, adiciona o item à lista local
      if (addItem) {
        addItem(response.data);  
      }

      message.success('Produto cadastrado com sucesso!');
      navigate('/'); // Navega para a página principal após cadastro
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      message.error('Erro ao cadastrar produto. Tente novamente.');
    }
  };

  // Função de cancelar
  const cancelar = () => {
    navigate('/');  // Redireciona para a página inicial
  };

  return (
    <div className="divCadastro">
      <h2 className="tituloCadastro">Cadastrar Novo Produto</h2>
      
      <Form
        form={form}  // Vincula o formulário ao hook do Ant Design
        onFinish={onFinish}
        className="formCadastro"
        layout="vertical"
      >
        <Form.Item
          name="nome"
          label="Nome do Produto"
          rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}>
          <Input placeholder="Ex: Produto 1" />
        </Form.Item>

        <Form.Item
          name="quantidade"
          label="Quantidade"
          rules={[{ required: true, message: 'Por favor, insira a quantidade!' }]}>
          <Input type="number" placeholder="Ex: 10" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Preço"
          rules={[{ required: true, message: 'Por favor, insira o preço!' }]}>
          <Input type="number" placeholder="Ex: 100.00" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Cadastrar
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
