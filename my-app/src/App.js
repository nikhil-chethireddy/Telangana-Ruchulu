import "./App.css";
import Home from "./Screen/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screen/Login";
import React from "react";
import Signup from "./Screen/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./Screen/MyOrder";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
