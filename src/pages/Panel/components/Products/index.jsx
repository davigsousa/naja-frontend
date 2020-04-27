import React, { useEffect, useState } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import { FaPlus } from 'react-icons/fa';

import api from '../../../../services/api';

import ProductItem from '../ProductItem';
import Footer from '../../../../App/Footer';
import LoadingModal from '../LoadingModal';

import './style.css';

function Products() {
  const location = useLocation();
  const match = useRouteMatch();
  const { category } = match.params;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [prodCat, setProdCat] = useState('');
  const [amount, setAmount] = useState(null);
  const [value, setValue] = useState('');

  const [loadingModal, setLoadingModal] = useState(false);
  const [newProd, setNewProd] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingModal(true);

      let res = await api.get(`/categorias/${category}`);
      const { categoria } = res.data;
      setProducts(categoria.produtos);

      res = await api.get('/categorias');
      setCategories(res.data.categorias);

      setLoadingModal(false);
    })();
    return (() => {
      setProducts([]);
      setCategories([]);
    }
    );
  }, [location.pathname]);

  const handleNewProduct = async (e) => {
    e.preventDefault();

    if (!file || !name || !value || amount === null || !prodCat) return;

    const formData = new FormData();
    formData.append('imagem', file);
    formData.append('nome', name);
    formData.append('categoria', prodCat);
    formData.append('quantidade', amount);
    formData.append('valor', value);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    setLoadingModal(true);
    const res = await api.post('/produtos/adicionar', formData, config);
    setLoadingModal(false);

    setFile(null); setAmount(null); setName(''); setValue(''); setProdCat('');

    const newProducts = products.slice();
    newProducts.push(res.data.produto);
    setProducts(newProducts);
  };

  return (
    <>
      <div className="products">
        <div className="products-title">
          <h1>{category}</h1>
          <button type="button" className="btn" onClick={() => setNewProd(true)}>
            Adicionar novo produto
            <FaPlus />
          </button>
        </div>
        <div className="products-list">
          {
            products.length > 0
              ? products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                />
              ))
              : <h1>Não foram encontrados produtos nessa categoria.</h1>
          }
        </div>
        <Footer />
      </div>

      <Modal
        open={newProd}
        center
        onClose={() => setNewProd(false)}
        classNames={{
          modal: 'modal',
        }}
      >
        <h1>Adicionar novo Produto</h1>
        <form onSubmit={handleNewProduct}>
          <span>Imagem do Produto</span>
          <input type="file" name="imagem" onChange={(e) => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Nome do Produto"
            onChange={(e) => setName(e.target.value)}
            className="btn"
          />
          <input
            type="text"
            placeholder="Valor do Produto em Reais"
            onChange={(e) => setValue(e.target.value)}
            className="btn"
          />
          <input
            type="text"
            placeholder="Quantidade em estoque"
            onChange={(e) => setAmount(Number.parseInt(e.target.value, 10))}
            className="btn"
          />
          <span>Escolha a categoria</span>
          <div>
            {
              categories.map(((item) => (
                <div key={Math.random()}>
                  <span>
                    {item}
                  </span>
                  <input type="radio" name="categoria" value={item} onChange={(e) => setProdCat(e.target.value)} />
                </div>
              )))
            }
          </div>
          <button type="submit" className="btn">Confirmar e Adicionar</button>
        </form>
      </Modal>

      <LoadingModal open={loadingModal} />
    </>
  );
}

export default Products;
