import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import api from '../../services/api';
import { login } from '../../services/auth';

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

    console.log(response);
  };

  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          login('eifjseiofjesfio', {
            name: 'Davi Sousa',
            email: 'davigomes4747@gmail.com',
          });
          history.push('/painel');
        }}
      >
        Fazer login
      </button>
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
                    className="social-button google"
                  >
                    <i className="fa fa-google" />
                    Fazer login com o Google
                  </button>
                )
              }
      />
    </div>
  );
}

export default Login;
