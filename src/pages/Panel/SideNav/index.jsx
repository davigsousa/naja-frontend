import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

import { getUser, logout } from '../../../services/auth';

import desk from '../../../assets/desk.jpg';
import avatar from '../../../assets/avatar.png';
import './style.css';

function SideNav() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const elem = document.querySelector('.sidenav');
      const instance = M.Sidenav.init(elem, {});
      instance.open();
    });

    const user = getUser();
    setName(user.name);
    setEmail(user.email);
  }, []);

  return (
    <ul className="sidenav sidenav-fixed">
      <li>
        <div className="user-view">
          <div className="background">
            <img src={desk} alt="" />
          </div>
          <Link to="/painel">
            <img className="circle" alt="Administrador" src={avatar} />
          </Link>
          <Link to="/painel"><span className="white-text name">{name}</span></Link>
          <Link to="/painel"><span className="white-text email">{email}</span></Link>
        </div>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            logout();
            history.push('/login');
          }}
          className="waves-effect waves-light btn red"
        >
          <i className="material-icons">close</i>
          Encerrar Sessão
        </button>
      </li>
      <li><Link to="/painel">Second Link</Link></li>
      <li><div className="divider" to="/painel" /></li>
      <li><Link className="subheader" to="/painel">Subheader</Link></li>
      <li><Link className="waves-effect" to="/painel">Third Link With Waves</Link></li>
    </ul>
  );
}

export default SideNav;
