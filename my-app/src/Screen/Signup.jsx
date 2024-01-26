import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  function handleChange(event) {
    return setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) alert("Enter valid credentials.");
    setCredentials({ name: "", email: "", password: "", location: "" });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container vh-100 d-flex align-items-center">
        <form
          className="w-50 m-auto border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={credentials.name}
              type="text"
              className="form-control"
            />
          </div>
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
          <div className="m-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              onChange={handleChange}
              name="location"
              value={credentials.location}
              type="text"
              className="form-control"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
