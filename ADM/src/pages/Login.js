import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import "../index.css";
import img from "../images/login.jpg";
import logo from "../images/logo.svg";
import Loading from "../components/loadingComponent";

let schema = yup.object().shape({
  email: yup
    .string("")
    .email("Email Should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, value, onChange, onBlue } = props;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(login(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);
  const [loading, setLoading] = useState(false);
  return (
    <main>
      <div class="container-fluid">
        {loading ? <Loading /> : null}

        <div class="row">
          <div class="col-sm-6 login-section-wrapper">
            <div class="brand-wrapper">
              <img src={logo} alt="logo" class="logo" />
            </div>
            <div class="login-wrapper my-auto">
              <h1 class="login-title">Log in</h1>
              <form action="#!" onSubmit={formik.handleSubmit}>
                <div class="form-group mb-4">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    // label="Email Address"
                    id="email"
                    class="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label for="password">Password</label>
                  <input
                    class="form-control"
                    type="password"
                    name="password"
                    id="pass"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
                <button
                  name="login"
                  id="login"
                  class="btn btn-block login-btn"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-6 px-0 d-none d-sm-block">
            <img src={img} alt="login image" class="login-img" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
