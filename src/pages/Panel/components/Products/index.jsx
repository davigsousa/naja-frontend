import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import './style.css';

function Products() {
  const match = useRouteMatch();
  const { category } = match.params;

  return (
    <div className="products-title">
      <h1>{category}</h1>
      <button type="button" className="btn">
        Adicionar novo produto
        <FaPlus />
      </button>
    </div>

  );
}

export default Products;
