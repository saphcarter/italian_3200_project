import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/App.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/custom.scss";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
