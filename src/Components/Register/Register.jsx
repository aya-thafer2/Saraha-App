import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../common/CustomInput";

function Register() {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const registerSchema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().min(5).required(),
    password: Joi.string().required(),
    cPassword: Joi.string().required(),
  });

  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name));
    if (validation.error) {
      setErrors({ ...errors, [name]: validation.error.details[0].message });
    } else {
      const err = { ...errors };
      delete err[name];
      setErrors({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const result = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup", inputs);
      toast.success('Registered successfully, please confirm your email!');
      console.log(result);
    }
  }

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
          
          <CustomInput
            error={errors.email}
            name="email"
            onChange={onChange}
            text="Enter Your Email"
            type="text"
          />
          <CustomInput
            error={errors.name}
            name="name"
            onChange={onChange}
            text="Enter Your Name"
            type="text"
          />
          <CustomInput
            error={errors.password}
            name="password"
            onChange={onChange}
            text="Enter Your Password"
            type="password"
          />
          <CustomInput
            error={errors.cPassword}
            name="cPassword"
            onChange={onChange}
            text="Confirm your Password"
            type="password"
          />

          <button className="btn btn-default-outline my-4 w-100 rounded">
            Register
          </button>
          <Link className="btn btn-default-outline" to="/login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
