import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SignOut } from "../services/Actions/authActions";

// import Loader from "../Loader";

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear()
      history.replace('/')
    }, 1500);
    dispatch(SignOut())
  }, []);
  return (
    <div
      style={{
        background:
          "url(/images/dev/reset-password.png) no-repeat center center/cover",
        height: "100vh",
      }}
    >
      <div style={{
          background: 'rgba(255, 255, 255, 0.657)',
          height: '100%'
      }}>
        {/* <Loader /> */}
      </div>
    </div>
  );
}

export default Logout;
