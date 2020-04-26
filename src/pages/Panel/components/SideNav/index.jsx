import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// import { getUser, logout } from '../../../../services/auth';

import avatar from '../../../../assets/avatar.png';
import './style.css';

function SideNav() {
  const history = useHistory();

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
          <h4>Categorias</h4>
          <ul className="panel-categories-list">
            {
              categories.map((category) => (
                <li>
                  <Link to={`/painel/${encodeURI(category)}`}>{category}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </li>

      <li>
        <div className="panel-logout">
          <button type="button">Encerrar Sessão</button>
        </div>
      </li>
    </ul>
  );
}

export default SideNav;
