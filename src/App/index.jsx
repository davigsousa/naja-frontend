import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';

import 'react-responsive-modal/styles.css';
import './style.css';

function App({ children }) {
  return (
    <div className="app-container">
      <Content>
        { children }
      </Content>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
