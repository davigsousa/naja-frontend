import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';

// import { getUser, logout } from '../../../../services/auth';

import avatar from '../../../../assets/avatar.png';
import './style.css';

function SideNav() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // const user = getUser();
    const user = { name: 'Davi Sousa', email: 'davigomes4747@gmail.com' };
    setName(user.name);
    setEmail(user.email);

    setCategories([
      'Celulares', "TV's", 'Notebooks', 'Video Games', 'Jogos', 'Acessórios',
    ]);
  }, []);

  return (
    <ul className="sidenav">
      <li>
        <div className="user-info">
          <img src={avatar} alt="Usuário" />
          <h1>{name}</h1>
          <p>{email}</p>
        </div>
      </li>

      <li>
        <div className="panel-categories">
          <div>
            <h4>Categorias</h4>
            <div className="new-category btn">
              Criar nova
              <FaPlusCircle />
            </div>
          </div>
          <ul className="panel-categories-list">
            <li>
              <Link to="/painel">Todos</Link>
            </li>
            {
              categories.map((category) => (
                <li>
                  <Link to={`/painel/${encodeURI(category)}`}>
                    <p>{category}</p>
                    <FaTimesCircle />
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </li>
    </ul>
  );
}

export default SideNav;
