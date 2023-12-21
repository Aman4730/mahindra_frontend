import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const auth = localStorage.getItem("token");
const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const { isLogin, guestlogin } = useContext(AuthContext);
  // const [authUserData] = userAuthContextData;
  // const { userOTPVerified } = authUserData
  return (
    <Route
      exact={exact ? true : false}
      rest
      render={(props) =>
        isLogin || guestlogin?.success ? (
          <Component {...props} {...rest}></Component>
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
