import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    return setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) alert("Enter valid credentials.");
    else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="container vh-100 d-flex align-items-center">
        <form
          className="w-50 m-auto border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={handleChange}
              name="email"
              value={credentials.email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              value={credentials.password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I am new user
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
