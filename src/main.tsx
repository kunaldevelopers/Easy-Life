import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error - App.jsx file import
import App from "./App.jsx";
import "./index.css";

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error("Failed to render app:", error);
  const fallbackHtml =
    '<div style="padding: 20px; text-align: center; font-family: Arial; background: #f3f4f6; height: 100vh; display: flex; align-items: center; justify-content: center;"><div><h2>Easy Life Gangtok</h2><p>Error loading application. Please refresh the page or try a different browser.</p></div></div>';
  document.body.innerHTML = fallbackHtml;
}
