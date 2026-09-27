// import { store } from "./app/store";
// import { Provider } from "react-redux";
import { createRoot  } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import CartProvider from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <BrowserRouter>
      <CartProvider>
          <App />
      </CartProvider>
      </BrowserRouter>  
  </AuthProvider>
);
