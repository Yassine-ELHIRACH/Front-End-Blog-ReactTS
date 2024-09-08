import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from './context/auth0-context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Auth0Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
