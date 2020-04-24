import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';

function Footer({ children }) {
  return (
    <div className="app-container">
      <Content>
        { children }
      </Content>

      <footer className="page-footer " style={{ padding: 0 }}>
        <div className="footer-copyright">
          <div className="container">
            © 2020 Todos os direitos reservados Codex Jr.
          </div>
        </div>
      </footer>
    </div>
  );
}

Footer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Footer;
