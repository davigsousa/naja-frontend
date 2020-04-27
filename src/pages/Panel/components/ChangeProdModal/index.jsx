import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-responsive-modal';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

import api from '../../../../services/api';

import './style.css';

function NewProductModal({
  open, onClose, onChange, product,
}) {
  const {
    _id: id, nome, quantidade, valor,
  } = product;

  const [amount, setAmount] = useState(quantidade);

  const handlePlus = () => {
    setAmount(Number.parseInt(amount, 10) + 1);
  };

  const handleMinus = () => {
    const newAmount = Number.parseInt(amount, 10) - 1;
    setAmount(newAmount >= 0 ? newAmount : 0);
  };

  return (
    <>
      <Modal
        open={open}
        center
        onClose={onClose}
        classNames={{
          modal: 'modal view-product',
        }}
      >
        <img src={`${api.getBaseUrl()}produtos/${id}`} alt="Produto" />
        <h1>{nome}</h1>
        <div>
          <div className="product-detail">
            <span>Quantidade</span>
            <div>
              <FaMinusCircle onClick={handleMinus} />
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <FaPlusCircle onClick={handlePlus} />
            </div>
          </div>
          <div className="product-detail">
            <span>Valor</span>
            {`R$${valor}`}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onChange(amount);
          }}
          className="btn"
        >
          Salvar Produto
        </button>
      </Modal>
    </>
  );
}

NewProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    valor: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewProductModal;
