import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import api from '../../services/api';
import { login } from '../../services/auth';

import './style.css';
import google from '../../assets/google.png';
import banner from '../../assets/banner.png';

function Login() {
  const history = useHistory();

  const handleGoogle = async ({ accessToken }) => {
    const response = await api({
      method: 'POST',
      url: '/auth/login',
      headers: {
        accesstoken: accessToken,
      },
    });

    const { user, token } = response.data;
    login(token, user);

    history.push('/painel');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={banner} alt="Naja Informática" className="responsive-img" />
        <h1>Controle de Estoque</h1>
      </div>

      <div className="login-info">
        <h2>Fazer login como Administrador</h2>
        <p>Entre com a sua conta de administrador para gerenciar o estoque da loja.</p>
      </div>

      <GoogleLogin
        clientId="346347689640-mhk33tcocgf156ktp6edf023sm8ep7oj.apps.googleusercontent.com"
        buttonText="Fazer login com o Google"
        onSuccess={handleGoogle}
        onFailure={handleGoogle}
        autoLoad={false}
        render={
                (renderProps) => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="social-button btn"
                  >
                    <img src={google} alt="google" className="responsive-img" />
                    Fazer login com o Google
                  </button>
                )
              }
      />
    </div>
  );
}

export default Login;
