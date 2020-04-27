import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-responsive-modal';


function NewProductModal({
  open, onClose, onSubmit, categories,
}) {
  const [file, setFile] = useState(undefined);
  const [name, setName] = useState('');
  const [prodCat, setProdCat] = useState('');
  const [amount, setAmount] = useState('');
  const [value, setValue] = useState('');

  return (
    <Modal
      open={open}
      center
      onClose={onClose}
      classNames={{
        modal: 'modal',
      }}
    >
      <h1>Adicionar novo Produto</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(file, name, prodCat, amount, value);
        setFile(undefined); setName(''); setProdCat(''); setAmount(''); setValue('');
      }}
      >
        <span>Imagem do Produto</span>
        <input
          type="file"
          name="imagem"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="btn"
        />
        <input
          type="text"
          placeholder="Valor do Produto em Reais"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="btn"
        />
        <input
          type="text"
          placeholder="Quantidade em estoque"
          value={amount}
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
  );
}

NewProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewProductModal;
