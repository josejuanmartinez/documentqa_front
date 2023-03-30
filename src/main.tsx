import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppLoading } from './components/AppLoading';
import { LoaderApp } from './LoaderApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoaderApp fallback={<AppLoading />}>
      <App />
    </LoaderApp>
  </React.StrictMode>,
);
