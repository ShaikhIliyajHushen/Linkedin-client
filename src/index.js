import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './component/UserContext';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Auth0Provider
      domain="dev-et44cm1vtsudtgz7.us.auth0.com"
      clientId="xHNaT3Lgx9yUA6kM9FhSlDhPr1YYEH28"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
     <UserProvider>
    <App />
    </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
