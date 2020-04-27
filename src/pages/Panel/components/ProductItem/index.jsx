import React from 'react';
import { Modal } from 'react-responsive-modal';

import './style.css';

function ProductItem({ product, onDelete, onChange }) {
  const { nome, quantidade, valor } = product;

  let className = 'product-item';
  if (quantidade === 0) className += ' product-zero';
  else if (quantidade < 10) className += ' product-low';

  return (
    <>
      <button type="button" className="product-button">
        <div className={className}>
          <h2>{nome}</h2>
          <div style={{ display: 'flex' }}>
            <div className="product-detail">
              <span>Quantidade</span>
              {`${quantidade} itens`}
            </div>
            <div className="product-detail">
              <span>Valor</span>
              {`R$${valor}`}
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default ProductItem;
