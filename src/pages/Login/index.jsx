import React from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '../../services/auth';

function Login() {
  const history = useHistory();

  return (
    <button
      type="submit"
      onClick={() => {
        login('eifjseiofjesfio', {
          name: 'Davi',
          email: 'email@email.com',
        });
        history.push('/painel');
      }}
    >
      Fazer login
    </button>
  );
}

export default Login;
