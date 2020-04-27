import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import { FaTrashAlt } from 'react-icons/fa';

import ChangeProdModal from '../ChangeProdModal';

import './style.css';

function ProductItem({ product, onDelete, onChange }) {
  const {
    nome, quantidade, valor, _id,
  } = product;

  const [deleteModal, setDeleteModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);

  let className = 'product-item';
  if (quantidade === 0) className += ' product-zero';
  else if (quantidade < 10) className += ' product-low';

  return (
    <>
      <Link
        to="#"
        className={className}
      >
        <button
          type="button"
          className="product-button"
          onClick={() => setChangeModal(true)}
        >
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
        </button>
        <button
          type="button"
          className="product-detail product-trash"
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          <FaTrashAlt />
        </button>
      </Link>

      <Modal
        open={deleteModal}
        center
        onClose={() => setDeleteModal(false)}
        classNames={{
          modal: 'modal',
        }}
      >
        <h1>Você realmente deseja remover esse item?</h1>
        <div>
          <button
            type="button"
            className="btn"
            onClick={() => setDeleteModal(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onDelete(_id);
              setDeleteModal(false);
            }}
          >
            Sim, eu desejo

          </button>
        </div>
      </Modal>

      <ChangeProdModal
        open={changeModal}
        onClose={() => setChangeModal(false)}
        onChange={(newAmount) => {
          onChange(_id, newAmount);
          setChangeModal(false);
        }}
        product={product}
      />
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    valor: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductItem;
