import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import { Provider } from "react-redux";
import Store from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

const { persistor, store } = Store();

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);  