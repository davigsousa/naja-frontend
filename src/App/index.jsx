import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import Footer from './Footer';

import './style.css';

function App({ children }) {
  return (
    <div className="app-container">
      <Content>
        { children }
      </Content>

      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
