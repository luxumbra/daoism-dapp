import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import App from '@daoism/App';

ReactDOM.createRoot(document.querySelector('#app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
