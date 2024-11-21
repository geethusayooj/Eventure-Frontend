import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.jsx";
import { AuthProviderWrapper } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </StyledEngineProvider>
  </StrictMode>
);
