import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClickToComponent } from "click-to-react-component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ClickToComponent />
    <App />
  </>,
);
