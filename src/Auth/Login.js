/* eslint-disable  */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import { authActionCreators } from "../services/Actions";
// import "./Auth.css";
import "./css/auth.css";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state?.auth);
  const { Login, ResetAuthResponse } = bindActionCreators(
    authActionCreators,
    dispatch
  );
  const [formData, setFormData] = useState(null);

  const { isLoading, response, authenticated, user, user_type } = auth;

  const handleInputChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClickOpen = () => {};

  const handleLogin = (e) => {
  
    e.preventDefault();
    console.log(formData);
    if (formData !== null) {
      Login(formData);
    } else {
      toast.error("All fields are required");
    }
  };

  //ADMIN, LOAN_OFFICER, MART_OFFICER, INVESTMENT_OFFICER, USER
  if (
    authenticated &&
    user_type === "SYSTEM_USER" &&
    user?.super_role === "ADMIN"
  ) {
    history.replace("/admin/home");
  }
  if (
    authenticated &&
    user_type === "SYSTEM_USER" &&
    user?.super_role === "LOAN_OFFICER"
  ) {
    history.replace("/loans/home");
  }
  if (
    authenticated &&
    user_type === "SYSTEM_USER" &&
    user?.super_role === "MART_OFFICER"
  ) {
    history.replace("/mart/home");
  }
  if (
    authenticated &&
    user_type === "SYSTEM_USER" &&
    user?.super_role === "INVESTMENT_OFFICER"
  ) {
    history.replace("/investment/home");
  }

  useEffect(() => {
    if (response?.state === "SUCCESS") {
      toast.success(response?.message);
      setTimeout(() => {
        ResetAuthResponse();
      }, 300);
    } else if (response?.state === "ERROR") {
      toast.error(response?.message);
      setTimeout(() => {
        ResetAuthResponse();
      }, 300);
    }
  }, [response?.state, response?.message]);

  return (
    <div className="loginPage">
      <form
        className="section_one"
        style={{
          background:
            "url(/images/dev/background.jpg) no-repeat center center/cover",
        }}
      >
        <div className="overlay"></div>
      </form>
      <div
        className="section_two"
        style={{
          background:
            "url(/images/dev/nurse-float.jpeg) no-repeat center center/cover",
        }}
      >
        <div className="overlay">
          {/* <h1 className="title">Login</h1> */}
          {/* <div className="email-form-group form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="password-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
          </div> */}
          <form>
            <h1 className="title">Login</h1>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email / Staff code
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="example@gmail.com / 202020"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <button className="button mb2 mt1" onClick={handleLogin}>
              Login
            </button>
            <p
              className="forgot_password"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleClickOpen}
            >
              Forgot password?
            </p>
          </form>
        </div>
      </div>

      {/* <AlertDialogSlide open={open} close={handleClose}/> */}
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

export default Login;
