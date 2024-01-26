import React, { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Model from "../Model";
import Cart from "../Screen/Cart";
import { useCart } from "../components/ContextReducer";

function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic main-heading" to="/">
            Telangana Ruchulu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 mt-1 sec-heading"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 mt-1 sec-heading"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-2" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart {"  "}
                  {data.length !== 0 && (
                    <Badge pill bg="danger">
                      {" "}
                      {data.length}{" "}
                    </Badge>
                  )}
                </Link>
                {cartView && (
                  <Model onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Model>
                )}
                <Link
                  className="btn bg-white text-danger mx-2"
                  onClick={() => localStorage.removeItem("authToken")}
                  to="/login"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
