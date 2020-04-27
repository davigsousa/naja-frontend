import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaPlusCircle, FaTimesCircle, FaPowerOff } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';

import LoadingModal from '../LoadingModal';

import api from '../../../../services/api';
import { getUser, logout } from '../../../../services/auth';

import avatar from '../../../../assets/avatar.png';
import './style.css';

function SideNav() {
  const history = useHistory();
  const location = useLocation();

  const user = getUser();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [removeCategory, setRemoveCategory] = useState('');

  const [lgModal, setLgModal] = useState(false);
  const [newCatModal, setNewCatModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.get('/categorias');
      setCategories(res.data.categorias);
    })();
  }, [location.pathname]);

  const submitNewCategory = async () => {
    setNewCatModal(false);
    setLoadingModal(true);
    await api.post('/categorias/adicionar', { nome: newCategory });
    setLoadingModal(false);

    const newPage = `/painel/${encodeURI(newCategory)}`;
    setNewCategory('');
    history.push(newPage);
  };

  const submitRemoveCategory = async () => {
    setRemoveModal(false);
    setLoadingModal(true);
    await api.delete(`/categorias/${removeCategory}`);
    setLoadingModal(false);

    history.push('/painel/Todos');
  };

  return (
    <>
      <ul className="sidenav">
        <li>
          <div className="user-info">
            <img src={user.picture || avatar} alt="Usuário" />
            <h1>{user.name}</h1>
            <p>
              {user.email}
              <FaPowerOff onClick={() => setLgModal(true)} />
            </p>
          </div>
        </li>

        <li>
          <div className="panel-categories">
            <div>
              <h4>Categorias</h4>
              <button
                className="new-category btn"
                type="button"
                onClick={() => setNewCatModal(true)}
              >
                Criar nova
                <FaPlusCircle />
              </button>
            </div>
            <ul className="panel-categories-list">
              <li>
                <Link to="/painel/Todos">Todos</Link>
              </li>
              {
                categories.map((category) => (
                  <li key={category}>
                    <Link to={`/painel/${encodeURI(category)}`}>
                      <p>{category}</p>
                      <FaTimesCircle onClick={() => {
                        setRemoveCategory(category);
                        setRemoveModal(true);
                      }}
                      />
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </li>
      </ul>

      <Modal
        open={newCatModal}
        center
        onClose={() => setNewCatModal(false)}
        classNames={{ modal: 'modal' }}
      >
        <h1>Adicionar Categoria</h1>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          type="submit"
          className="btn"
          onClick={submitNewCategory}
        >
          Confirmar
        </button>
      </Modal>

      <Modal
        open={lgModal}
        center
        onClose={() => setLgModal(false)}
        classNames={{ modal: 'modal' }}
      >
        <h1>Deseja mesmo sair?</h1>
        <button
          type="button"
          className="btn"
          onClick={() => {
            logout();
            setLgModal(false);
            history.push('/login');
          }}
        >
          Sim, encerrar sessão.
        </button>
      </Modal>

      <Modal
        open={removeModal}
        center
        onClose={() => setRemoveModal(false)}
        classNames={{ modal: 'modal' }}
      >
        <h1>Você realmente quer remover essa categoria?</h1>
        <p>Todos os produtos pertencentes a ela irão ser removidos.</p>
        <button
          type="button"
          className="btn"
          onClick={submitRemoveCategory}
        >
          Sim, remover
        </button>
      </Modal>

      <LoadingModal open={loadingModal} />
    </>
  );
}

export default SideNav;
