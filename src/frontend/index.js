import React from 'react';
import reactDom from 'react-dom';

// import './style/style.css';

const App = () => {
  return <h1>
    Hello World React and Node

    la para
  </h1>
};

reactDom.render(
  <App/>,
  document.getElementById('app')
);