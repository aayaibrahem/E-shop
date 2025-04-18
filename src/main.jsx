import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./rtk/store.js";
import AuthContext from "./context/AuthContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
createRoot(document.getElementById("root")).render(
  <AuthContext>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContext>
);
