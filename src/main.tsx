import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <canvas style={{ background: "#322" }} />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
