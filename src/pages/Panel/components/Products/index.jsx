import React, { useEffect, useState } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import api from '../../../../services/api';

import ProductItem from '../ProductItem';
import Footer from '../../../../App/Footer';
import NewProductModal from '../NewProductModal';
import LoadingModal from '../LoadingModal';

import './style.css';


function Products() {
  const location = useLocation();
  const match = useRouteMatch();
  const { category } = match.params;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const handleNewProduct = async (file, name, prodCat, amount, value) => {
    if (!file || !name || !value || !prodCat) return;

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

    const newProducts = products.slice();
    newProducts.push(res.data.produto);
    newProducts.sort((a, b) => a.quantidade - b.quantidade);

    setProducts(newProducts);
  };

  const onDelete = async (id) => {
    setLoadingModal(true);

    await api.delete(`/produtos/${id}`);
    const newProducts = products.filter((product) => (product._id !== id));
    setProducts(newProducts);

    setLoadingModal(false);
  };

  const onChange = async (id, newAmount) => {
    setLoadingModal(true);

    const res = await api.put(`/produtos/${id}`, {
      quantidade: Number.parseInt(newAmount, 10),
    });
    const newProduct = res.data.produto;
    const newProducts = products.filter((product) => (product._id !== id));
    newProducts.push(newProduct);

    newProducts.sort((a, b) => a.quantidade - b.quantidade);

    setProducts(newProducts);

    setLoadingModal(false);
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
                  onDelete={onDelete}
                  onChange={onChange}
                />
              ))
              : <h1>Não foram encontrados produtos nessa categoria.</h1>
          }
        </div>
        <Footer />
      </div>

      <NewProductModal
        open={newProd}
        onClose={() => setNewProd(false)}
        categories={categories}
        onSubmit={handleNewProduct}
      />

      <LoadingModal open={loadingModal} />
    </>
  );
}

export default Products;
