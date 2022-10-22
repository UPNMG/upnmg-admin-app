/* eslint-disable  */
import React from "react";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";


function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory()
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      component={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          // return <Redirect to={"/"} />;
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
