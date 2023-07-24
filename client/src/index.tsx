import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
);
