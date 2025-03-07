import React from 'react';
import * as ReactDOMClient from "react-dom/client";
import App from './App';
import { MaterialUIControllerProvider } from './context';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);

