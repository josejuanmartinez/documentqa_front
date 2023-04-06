import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "@fontsource/montserrat";
import './index.css';
import { AppLoading } from './components/AppLoading';
import { LoaderApp } from './LoaderApp';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      {/*<ThemeProvider theme={custom_theme_1}>*/}
        <LoaderApp fallback={<AppLoading />}>
          <App />
        </LoaderApp>
      {/*</ThemeProvider>*/}
  </React.StrictMode>,
);
