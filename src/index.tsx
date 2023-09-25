import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import 'config/configureMobX';
import 'regenerator-runtime';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if (module.hot) {
  module.hot.accept();
}
