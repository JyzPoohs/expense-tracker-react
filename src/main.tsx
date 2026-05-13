import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./auth/keycloak";

keycloak
  .init({
    onLoad: "login-required", 
    pkceMethod: "S256",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    if (!authenticated) {
      console.log("Not authenticated");
    } else {
      console.log("Authenticated");
      console.log("Token:", keycloak.token);
    }

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });