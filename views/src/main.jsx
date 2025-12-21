import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { ToastContainer } from "react-toastify";
// Redux Store Provider Setup
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux */}
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
