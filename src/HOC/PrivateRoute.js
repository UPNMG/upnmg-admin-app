/* eslint-disable  */
import React from "react";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";



function PrivateRoute({ component: Component, ...rest }) {
  const token = window.localStorage.getItem("token");
  const history  = useHistory()
  return (
    <Route
      {...rest}
      component={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          history.replace('/')

          // return <Redirect to={"/"} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
