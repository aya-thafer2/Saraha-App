import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

function Login({ setLogUser }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const validateUser = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const validation = validateUser();
    const errorsList = [];

    if (validation.error) {
      validation.error.details.map((err) => {
        errorsList.push(err.message);
      });
      setErrors(errorsList);
    } else {
      setErrors([]);
      const result = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
        user
      );
      if (result.data.message === "success") {
        const expires = new Date();
        const futureDay = expires.getDate()+1;
        expires.setDate(futureDay);
        cookie.save("token", result.data.token, {expires});
        setLogUser(result.data.token);
      } else {
        result.data.err.map((err) => {
          errorsList.push(err[0].message);
          setErrors(errorsList);
        });
      }
    }
  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={submitForm}>
          {errors.map((error, index) => (
            <div className="alert alert-danger" role="alert" key={index}>
              {error}
            </div>
          ))}

          <input
            onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={user.email}
          />
          <input
            onChange={onChange}
            className="form-control my-4 "
            placeholder="Enter your Password"
            type="password"
            name="password"
            value={user.password}
          />
          <button className="btn btn-default-outline my-4 w-100 rounded">
            Login
          </button>
          <p>
            <Link className="text-muted forgot btn" to='/forget-password'>
              I Forgot My Password
            </Link>
          </p>
          <Link className="btn btn-default-outline" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
