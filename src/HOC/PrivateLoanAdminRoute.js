/* eslint-disable  */
import React from "react";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";


function PrivateLoanAdminRoute({ component: Component, ...rest }) {
  const history = useHistory()
  const token = window.localStorage.getItem("token");
  const user = JSON.parse(window.localStorage.getItem("user"));
//   console.log('userRoute', user?.role.includes('LOAN_OFFICER'))
//   && user?.role.includes('ADMIN') || user?.role.includes('LOAN_OFFICER'
  return (
    <Route
      {...rest}
      component={(props) => {
        if (token && user?.role.includes('ADMIN') || user?.role.includes('LOAN_OFFICER')) {
          return <Component {...props} />;
        } else {
          // return <Redirect to={"/"} />;
          // return <Redirect to={"/"} />;
          history.replace('/')
        }
      }}
    />
  );
}

export default PrivateLoanAdminRoute;
